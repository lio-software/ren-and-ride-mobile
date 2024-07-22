import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class ListVehiclesByUserIdUseCase {
  private vehicleRepository: IVehicleRepositoryPort;

  constructor(vehicleRepository: IVehicleRepositoryPort) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(user_id: string) {
    return this.vehicleRepository.listByUserId(user_id);
  }
}

export default ListVehiclesByUserIdUseCase;