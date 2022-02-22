export class House {
  constructor(data) {
    this.id = data.id || "";
    this.bedrooms = data.bedrooms || "";
    this.bathrooms = data.bathrooms || "";
    this.year = data.year || "";
    this.price = data.price || "";
    this.levels = data.levels || "";
    this.description = data.description || "";
    this.imgUrl = data.imgUrl || "";
  }

  get Template() {
    return `
      <div class="col-md-4">
      <div class="bg-white rounded shadow">
      <img class="object-fit-img rounded-top" src="${this.imgUrl}" alt="car image">
      <div class="p-3 ">
      <p> $  ${this.price} | ${this.year} | ${this.levels}</p>
      <p> ${this.bathrooms}</p>
      <p>$${this.bedrooms}</p>
      <p>${this.description}</p>
      <div class="d-flex align-items-center">

      <div class="text-end">
      <button class="btn btn-outline-warning" onclick="app.housesController.editHouse('${this.id}')"> Edit </button>
      <button class="btn btn-outline-danger" onclick="app.housesController.deleteHouse('${this.id}')"> delete </button>
      </div>
      </div>
      </div>
      </div>
      </div>
      `;
  }
}
