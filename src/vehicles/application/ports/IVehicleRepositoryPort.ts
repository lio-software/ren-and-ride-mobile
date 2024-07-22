import CommentEntity from "../../domain/entities/CommentEntity";
import VehicleEntity from "../../domain/entities/VehicleEntity";

interface IVehicleRepositoryPort {
  create(car: VehicleEntity): Promise<VehicleEntity>;
  getById(id: string): Promise<VehicleEntity>;
  list(keyword?: string): Promise<VehicleEntity[]>;
  listByUserId(userId: string): Promise<VehicleEntity[]>;
  update(vehicle: VehicleEntity, id: string): Promise<VehicleEntity>;
  getCommentsByVehicleId(vehicleId: string): Promise<CommentEntity[]>;
  rateVehicle(comment: CommentEntity): Promise<void>;
}

export default IVehicleRepositoryPort;