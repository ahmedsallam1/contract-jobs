import { Transaction } from "sequelize";
import { ContractModel, JobModel } from "../models";
import { DATARANGE } from "../types";
import { BaseRepository } from "./BaseRepository";

export class ProfileRepository extends BaseRepository {
  public async getBalance (id: number, transaction: Transaction) {
    return this.model.findOne({
      where: {
        id,
      },
      attributes: ["balance"],
      transaction,
      lock: transaction.LOCK.UPDATE
    });
  }

  public async withdraw (id: number, amount: number, transaction: Transaction) {
    return this.model.update({
      balance: this.literal(`"balance" -${amount}`),
    }, {
      where: { id },
      transaction
    }
    )
  }

  public async deposit (id: number, amount: number, transaction: Transaction) {
    return this.model.update({
      balance: this.literal(`"balance" +${amount}`),
    }, {
      where: { id },
      transaction
    }
    )
  }

  public async getMostPaidClients (dateRange: DATARANGE, limit: number) {
    return this.model.findAll({
      attributes: [
        'id',
        "firstName",
        "lastName",
        [this.literal("firstName || '  ' || lastName"), "fullName"],
        [this.fn('sum', this.col('Client.Jobs.price')), 'totalPaid']
      ],
      include: {
        model: ContractModel,
        as: "Client",
        attributes: [],
        required: true,
        include: [{
          model: JobModel,
          as: "Jobs",
          attributes: [],
          where: {
            paid: { [this.Op.ne]: null },
            createdAt: {
              [this.Op.between]: [dateRange.start, dateRange.end]
            }
          },
        }]
      },
      group: ["Profile.id"],
      order: [["totalPaid", "DESC"]],
      limit,
      subQuery:false
    })
  }
}