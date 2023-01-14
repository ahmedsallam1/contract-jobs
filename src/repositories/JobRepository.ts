import { Transaction } from "sequelize";
import { ContractModel } from "../models";
import { BaseRepository } from "./BaseRepository";

export class JobRepository extends BaseRepository {
  public async getActiveUnpaidWithContract (id: number, transaction: Transaction ) {
    return this.model.findOne({
      where: {
        id,
        paid: null
      },
      include: [
        {
          model: ContractModel,
          where: {
            status: { [this.Op.eq]: "in_progress" }
          }
        }
      ],
      transaction,
      lock: transaction.LOCK.UPDATE
    })
  }

  public async getActiveUnpaid (profileId: number) {
    return this.model.findAll({
      where: {
        paid: null,
      },
      //TODO: use types
      include: [
        {
          model: ContractModel,
          where: {
            status: { [this.Op.eq]: "in_progress" },
            [this.Op.or]: [
              { ClientId: profileId },
              { ContractorId: profileId }
            ]
          }
        }
      ]
    });
  }

  public async markAsPaid (id: number, transaction: Transaction) {
    return this.model.update(
      {
        paid: 1,
        paymentDate: Date.now(),
      },
      {
        where: { id },
        transaction
      }
    );
  }

  public async getUnpaidAmount (clientId: number, transaction: Transaction) {
    return this.model.sum("price", {
      where: {
        paid: null
      },
      include: [
        {
          model: ContractModel,
          where: {
            status: { [this.Op.eq]: "in_progress" },
            ClientId: clientId
          }
        }
      ],
      transaction
    });
  }
}