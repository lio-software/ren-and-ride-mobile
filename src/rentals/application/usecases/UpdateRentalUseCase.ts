import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";
import RentalEntity from "../../domain/entities/RentalEntity";

export default class UpdateRentalUseCase {
  constructor(private rentalRepository: IRentalRepositoryPort) {}

  async execute(rental: RentalEntity, rentalId: string): Promise<RentalEntity> {
    return await this.rentalRepository.update(rental, rentalId);
  }
}