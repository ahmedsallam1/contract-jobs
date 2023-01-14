import { DATARANGE } from "../types";
import { ContractService } from "./ContractService";
import { ProfileService } from "./ProfileService";

export class AdminService {
  private contractService: ContractService;
  private profileService: ProfileService;

  constructor(
    contractService: ContractService,
    profileService: ProfileService
  ) {
    this.contractService = contractService;
    this.profileService = profileService;
  }

  public async getBestProfession (dateRange: DATARANGE) {
    return this.contractService.getMostPaid(dateRange)
  }

  public async getBestClients (dateRange: DATARANGE, limit: number) {
    return this.profileService.getMostPaidClients(dateRange, limit)
  }
}