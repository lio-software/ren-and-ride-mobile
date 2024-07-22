import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class GetCommentsByVehicleIdUseCase {
  constructor(private vehicleRepository: IVehicleRepositoryPort) {}

  async execute(vehicleId: string) {
    return this.vehicleRepository.getCommentsByVehicleId(vehicleId);
  }
}

export default GetCommentsByVehicleIdUseCase;