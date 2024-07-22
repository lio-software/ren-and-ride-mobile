import IRentalRepositoryPort from "../application/ports/IRentalRepositoryPort";
import RentalRepositoryAdapter from "./adapters/RentalRepositoryAdapter";

import ListRentalsByLessorId from "../application/usecases/ListRentalsByLessorIdUseCase";
import GetRentalByIdUseCase from "../application/usecases/GetRentalByIdUseCase";
import ListRentalsByLesseIdUseCase from "../application/usecases/ListRentalsByLesseIdUseCase";
import CreateRentalUseCase from "../application/usecases/CreateRentalUseCase";
import UpdateRentalUseCase from "../application/usecases/UpdateRentalUseCase";
import IsRentalActiveByVehicleIdUseCase from "../application/usecases/IsRentalActiveByVehicleId";

const rentalRepositoryAdapter: IRentalRepositoryPort = new RentalRepositoryAdapter();

const listRentalsByLessorId = new ListRentalsByLessorId(rentalRepositoryAdapter);
const getRentalById = new GetRentalByIdUseCase(rentalRepositoryAdapter);
const listRentalsByLesseId = new ListRentalsByLesseIdUseCase(rentalRepositoryAdapter);
const createRental = new CreateRentalUseCase(rentalRepositoryAdapter);
const updateRental = new UpdateRentalUseCase(rentalRepositoryAdapter);
const isRentalActiveByVehicleId = new IsRentalActiveByVehicleIdUseCase(rentalRepositoryAdapter);

export {listRentalsByLessorId, 
  getRentalById, 
  listRentalsByLesseId, 
  createRental,
  updateRental,
  isRentalActiveByVehicleId
};