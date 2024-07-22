import RentalEntity from "../../domain/entities/RentalEntity";
import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";

class ListRentalsByLesseIdUseCase {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(lesse_id: string, active?: boolean): Promise<RentalEntity[]> {
    return this.rentalRepository.listByLesseId(lesse_id, active? true : false);
  }
}

export default ListRentalsByLesseIdUseCase;