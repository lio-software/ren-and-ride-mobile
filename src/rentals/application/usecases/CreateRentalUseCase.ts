import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";
import RentalEntity from "../../domain/entities/RentalEntity";

class CreateRentalUseCase {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(rental: RentalEntity): Promise<RentalEntity> {
    return this.rentalRepository.create(rental);
  }
}

export default CreateRentalUseCase;