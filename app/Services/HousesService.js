import { ProxyState } from "../AppState.js";
import { House } from "../Models/houses.js";
import { api } from "./AxiosService.js";

class HousesServices {
  async getAllHouses() {
    const res = await api.get("houses");
    console.log("this is the data of the houses", res.data);

    ProxyState.houses = res.data.map((rd) => new House(rd));
    ProxyState.houses = ProxyState.houses;
  }

  async createHouse(newHouse) {
    const res = await api.post("houses", newHouse);
    console.log("[House Service]: data from the form on new House ", res.data);

    let realHouse = new House(res.data);
    ProxyState.houses = [realHouse, ...ProxyState.houses];
  }

  async deleteHouse(houseId) {
    const res = await api.delete("houses/" + houseId);

    ProxyState.houses = ProxyState.houses.filter((h) => h.id != houseId);
  }

  async editHouse(updatedData, id) {
    const res = await api.put("houses/" + id, updatedData);
    const houseIndex = ProxyState.houses.find((h) => h.id == id);
    ProxyState.houses.splice(houseIndex, 1, new House(res.data));
    ProxyState.houses = ProxyState.houses;
  }
}

export const houseServices = new HousesServices();
