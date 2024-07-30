import IRentalRepositoryPort from "../ports/IRentalRepositoryPort";

class GetPredictionsByUserIdUseCase {
  private rentalRepository: IRentalRepositoryPort;

  constructor(rentalRepository: IRentalRepositoryPort) {
    this.rentalRepository = rentalRepository;
  }

  async execute(userId: string): Promise<any> {
    return this.rentalRepository.getPredictionsByUserId(userId);
  }
}

export default GetPredictionsByUserIdUseCase;