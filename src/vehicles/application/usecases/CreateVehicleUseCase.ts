import VehicleEntity from "../../domain/entities/VehicleEntity";
import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class CreateVehicleUseCase {
  private vehicleRepository: IVehicleRepositoryPort;

  constructor(vehicleRepository: IVehicleRepositoryPort) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(vehicle: VehicleEntity): Promise<VehicleEntity> {
    return this.vehicleRepository.create(vehicle);
  }
}

export default CreateVehicleUseCase;