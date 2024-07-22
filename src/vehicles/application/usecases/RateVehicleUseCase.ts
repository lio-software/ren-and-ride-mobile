import CommentEntity from "../../domain/entities/CommentEntity";
import IVehicleRepositoryPort from "../ports/IVehicleRepositoryPort";

class RateVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepositoryPort) {}

  async execute(comment: CommentEntity): Promise<void> {
    return this.vehicleRepository.rateVehicle(comment);
  }
}

export default RateVehicleUseCase;