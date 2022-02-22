import { ProxyState } from "../AppState.js";
import { getHouseForm } from "../Components/houseForm.js";
import { houseServices } from "../Services/HousesService.js";
import { Pop } from "../Utils/Pop.js";

function _drawHouse() {
  let temp = "";
  ProxyState.houses.forEach((h) => (temp += h.Template));
  document.getElementById("listings").innerHTML = temp;
}

export class HouseController {
  constructor() {
    ProxyState.on("houses", _drawHouse);
    console.log("hello world from the controller");
  }

  async viewHouses() {
    try {
      await houseServices.getAllHouses();
      document.getElementById("modal-body-slot").innerHTML = getHouseForm();
      document
        .getElementById("create-button")
        .classList.remove("visually-hidden");
    } catch (error) {
      console.error(error);
      Pop.toast(error.message, "error");
    }
  }

  async handleSubmit(id) {
    try {
      window.event.preventDefault();
      let form = window.event.target;
      let rawData = {
        bedrooms: form.bedrooms.value,
        bathrooms: form.bathrooms.value,
        year: form.year.value,
        description: form.description.value,
        price: form.price.value,
        imgUrl: form.imgUrl.value,
        levels: form.levels.value,
      };
      if (!id) {
        houseServices.createHouse(rawData);
      } else {
        houseServices.editHouse(rawData, id);
      }
      let modal = document.getElementById("new-listing");
      form.reset();
      bootstrap.Modal.getOrCreateInstance(modal).hide(); //NOTE closes bootstrap modal
      Pop.toast("Complete");
    } catch (error) {
      Pop.toast(error.message, "error");
    }
  }

  deleteHouse(houseId) {
    try {
      houseServices.deleteHouse(houseId);
      console.log(houseId, "this is the house id from delete house");
    } catch (error) {
      console.error(error);
      Pop.error();
    }
  }

  editHouse(id) {
    const house = ProxyState.houses.find((h) => h.id == id);
    document.getElementById("modal-body-slot").innerHTML = getHouseForm(house);
    let modal = document.getElementById("new-listing");
    bootstrap.Modal.getOrCreateInstance(modal).toggle();
  }
}
