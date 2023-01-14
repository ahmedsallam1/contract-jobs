import { JobModel, ProfileModel } from "../models";
import { DATARANGE } from "../types";
import { BaseRepository } from "./BaseRepository";

export class ContractRepository extends BaseRepository {
  public async getOneBy (id: number, profileId: number) {
    return await this.model.findOne({
      where: {
        id,
        ClientId: profileId
      }
    });
  }

  public async getNonTerminatedBy (profileId: number) {
    return await this.model.findAll({
      where: {
        //TODO: use types
        status: { [this.Op.ne]: "terminated" },
        [this.Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ]
      }
    });
  }

  public async getMostPaid (dateRange: DATARANGE) {
    return this.model.findAll({
      attributes: ['id', [this.fn('sum', this.col('Jobs.price')), 'totalPrice']],
      include: [
        {
          model: JobModel,
          as: "Jobs",
          attributes: [],
          where: {
            paid: { [this.Op.ne]: null },
            createdAt: {
              [this.Op.between]: [dateRange.start, dateRange.end]
            }
          }
        },
        {
          model: ProfileModel,
          attributes: ["profession"],
          as: "Contractor"
        }
      ],
      group: ["Contract.id"],
      order: [["totalPrice", "DESC"]],
      limit:1,
      subQuery:false
    })
  }
}