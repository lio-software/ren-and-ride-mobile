import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";
import VehicleEntity from "../../domain/entities/VehicleEntity";

class UpdateVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepositoryPort) {}

  async execute(vehicle: VehicleEntity, id: string): Promise<VehicleEntity> {
    try {
      return await this.vehicleRepository.update(vehicle, id);
    } catch (error) {
      console.error("Error al actualizar un vehiculo:", error);
      return Promise.reject(error);
    }
  }
}

export default UpdateVehicleUseCase;