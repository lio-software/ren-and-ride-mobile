import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class GetVehicleByIdUseCase {
  private vehicleRepository: IVehicleRepositoryPort;

  constructor(vehicleRepository: IVehicleRepositoryPort) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(id: string) {
    return this.vehicleRepository.getById(id);
  }
}

export default GetVehicleByIdUseCase;