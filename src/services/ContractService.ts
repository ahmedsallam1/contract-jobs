import { ContractRepository } from "../repositories";
import { DATARANGE } from "../types";

export class ContractService {
  private repository: ContractRepository;

  constructor(repository: ContractRepository) {
    this.repository = repository;
  }

  public async getOneBy (id: number, profileId: number) {
    return await this.repository.getOneBy(id, profileId);
  }

  public async getNonTerminatedBy (profileId: number) {
    return await this.repository.getNonTerminatedBy(profileId);
  }

  public async getMostPaid (dateRange: DATARANGE) {
    return this.repository.getMostPaid(dateRange);
  }
}