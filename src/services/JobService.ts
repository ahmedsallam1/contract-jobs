import { Sequelize, Transaction } from "sequelize";
import { JobRepository } from "../repositories";
import { ProfileService } from "./ProfileService";

export class JobService {
  private repository: JobRepository;
  private profileService: ProfileService;
  private sequelize : any;

  constructor(
    repository: JobRepository, 
    profileService: ProfileService,
    sequelize: Sequelize
  ) {
    this.repository = repository;
    this.profileService = profileService;
    this.sequelize = sequelize
  }

  public async getActiveUnpaid (profileId: number) {
    return this.repository.getActiveUnpaid(profileId);
  }

  public async pay (jobId: number) {
    try {
      return this.sequelize.transaction(async (transaction) => {
        const job = await this.repository.getActiveUnpaidWithContract(jobId, transaction)
        if (!job) {
          throw new Error("Job Not Found!");
        }
        const { ClientId, ContractorId } = job.Contract;
        
        if (!await this.profileService.hasBalance(ClientId, job.price, transaction)) {
          throw new Error("You don't have enough balance");
        }
        
        await this.profileService.withdraw(ClientId, job.price, transaction);
        await this.profileService.deposit(ContractorId, job.price, transaction);
    
        return this.repository.markAsPaid(jobId, transaction);
    
      });
    } catch (error) {
    }
  }

  public async getUnpaidAmount (clientId: number, transaction: Transaction) {
    return this.repository.getUnpaidAmount(clientId, transaction);
  }
}   