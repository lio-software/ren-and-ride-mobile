import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";

class IsRentalActiveByVehicleIdUseCase {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(vehicle_id: string): Promise<boolean> {
    return this.rentalRepository.isRentalActiveByVehicleId(vehicle_id);
  }
}

export default IsRentalActiveByVehicleIdUseCase;