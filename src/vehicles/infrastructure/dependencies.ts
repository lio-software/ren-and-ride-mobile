import IVehicleRepositoryPort from "../application/ports/IVehicleRepositoryPort";
import VehicleRepositoryAdapter from "./adapters/VehicleRepositoryAdapter";

import ListVehiclesUseCase from "../application/usecases/ListVehiclesUseCase";
import CreateVehicleUseCase from "../application/usecases/CreateVehicleUseCase";
import ListVehiclesByUserIdUseCase from "../application/usecases/ListVehiclesByUserIdUseCase";
import GetVehicleByIdUseCase from "../application/usecases/GetVehicleByIdUseCase";
import GetCommentsByVehicleIdUseCase from "../application/usecases/GetCommentsByVehicleIdUseCase";
import RateVehicleUseCase from "../application/usecases/RateVehicleUseCase";
import UpdateVehicleUseCase from "../application/usecases/UpdateVehicleUseCase";

const vehicleRepositoryAdapter: IVehicleRepositoryPort = new VehicleRepositoryAdapter();

const listVehiclesUseCase = new ListVehiclesUseCase(vehicleRepositoryAdapter);
const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepositoryAdapter);
const listVehiclesByUserIdUseCase = new ListVehiclesByUserIdUseCase(vehicleRepositoryAdapter);
const getVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepositoryAdapter);
const getCommentsByVehicleIdUseCase = new GetCommentsByVehicleIdUseCase(vehicleRepositoryAdapter);
const rateVehicleUseCase = new RateVehicleUseCase(vehicleRepositoryAdapter);
const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepositoryAdapter);


export {
  listVehiclesUseCase,
  createVehicleUseCase, 
  listVehiclesByUserIdUseCase, 
  getVehicleByIdUseCase, 
  getCommentsByVehicleIdUseCase,
  rateVehicleUseCase,
  updateVehicleUseCase
};