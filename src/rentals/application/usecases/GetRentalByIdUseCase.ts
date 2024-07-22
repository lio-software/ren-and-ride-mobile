import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";

class GetRentalByIdUseCase {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(uuid: string) {
    return this.rentalRepository.getById(uuid);
  }
}

export default GetRentalByIdUseCase;