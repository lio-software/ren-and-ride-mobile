import VehicleEntity from "../../domain/entities/VehicleEntity";
import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class ListVehiclesUseCase {
  private vehicleRepository: IVehicleRepositoryPort;

  constructor(vehicleRepository: IVehicleRepositoryPort) {
    this.vehicleRepository = vehicleRepository;
  }

  async execute(keyword?: string): Promise<VehicleEntity[]> {
    return this.vehicleRepository.list(keyword);
  }
}

export default ListVehiclesUseCase;