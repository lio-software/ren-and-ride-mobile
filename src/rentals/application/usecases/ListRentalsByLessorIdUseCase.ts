import RentalEntity from "../../domain/entities/RentalEntity";
import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";

class ListRentalsByLessorId {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(lessor_id: string): Promise<RentalEntity[]> {
    return this.rentalRepository.listByLessorId(lessor_id);
  }
}

export default ListRentalsByLessorId;