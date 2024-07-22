import RentalEntity from "../../domain/entities/RentalEntity";

interface IRentalRepositoryPort {
  create(rental: RentalEntity): Promise<RentalEntity>;
  getById(uuid: string): Promise<RentalEntity>;
  list(): Promise<RentalEntity[]>;
  listByLessorId(lessor_id: string): Promise<RentalEntity[]>;
  listByLesseId(lesse_id: string, active?: boolean): Promise<RentalEntity[]>;
  update(rental: RentalEntity, rentalId: string): Promise<RentalEntity>;
  isRentalActiveByVehicleId(vehicle_id: string): Promise<boolean>;
}

export default IRentalRepositoryPort;