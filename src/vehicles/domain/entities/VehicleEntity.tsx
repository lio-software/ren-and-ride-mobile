class VehicleEntity {
  _id: string;
  model: string;
  brand: string;
  type: string;
  year: number;
  rentalPrice: number;
  address: string;
  userId: string;
  avalible: boolean;
  stars: number;
  vehicleImages: string[];
  description: string;
  color: string;

  constructor({ id, model, brand, vehicle_type, year, price, location, user_id, avaliable, stars, vehicleImages, description, color }) {
    this._id = id;
    this.model = model;
    this.brand = brand;
    this.type = vehicle_type;
    this.year = year;
    this.rentalPrice = price;
    this.address = location;
    this.userId = user_id;
    this.avalible = avaliable;
    this.stars = stars;
    this.vehicleImages = vehicleImages;
    this.description = description;
    this.color = color;
  }
}

export default VehicleEntity;