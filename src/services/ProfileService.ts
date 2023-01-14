import _ from "lodash";
import { Transaction } from "sequelize";
import { MOST_PAID_CLIENTS_LIMIT } from "../config/admin";
import { ProfileRepository } from "../repositories";
import { DATARANGE } from "../types";

export class ProfileService {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  public async hasBalance (id: number, amount: number, transaction: Transaction) {
    const { balance } = await this.repository.getBalance(id, transaction);
    return balance >= amount;
  }

  public async withdraw (id: number, amount: number, transaction: Transaction) {
    return this.repository.withdraw(id, amount, transaction);
  }

  public async deposit (id: number, amount: number,  transaction: Transaction) {
    return this.repository.deposit(id, amount, transaction);
  }

  public async getMostPaidClients (dateRange: DATARANGE, limit: number) {
    return this.repository.getMostPaidClients(dateRange, _.defaultTo(limit, MOST_PAID_CLIENTS_LIMIT));
  }
}