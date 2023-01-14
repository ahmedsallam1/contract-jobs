import { Sequelize } from "sequelize";
import { JobService } from "./JobService";
import { ProfileService } from "./ProfileService";

export class BalanceService {
  private profileService: ProfileService;
  private jobService: JobService;
  private sequelize: Sequelize;

  constructor(
    profileService: ProfileService,
    jobService: JobService,
    sequelize: Sequelize
  ) {
    this.profileService = profileService;
    this.jobService = jobService;
    this.sequelize = sequelize;
  }

  public async deposit (userId: number, amount: number) {
    try {
      return this.sequelize.transaction(async (transaction) => {
        const unpaindAmount = await this.jobService.getUnpaidAmount(userId, transaction)
        if (amount > ( unpaindAmount * 0.25 )) {
          throw new Error(`You can't deposit more than %25 of your unpaid jobs (${unpaindAmount})`);
        }

        return await this.profileService.deposit(userId, amount, transaction)
      });
    } catch (error) {
      throw error;
    }
  }
}