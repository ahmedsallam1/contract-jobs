
import { Request, Response } from 'express'
import { ContractModel, ProfileModel } from '../models';
import { ContractRepository, ProfileRepository } from '../repositories';
import { ContractService, ProfileService } from '../services';
import { AdminService } from '../services/AdminService';
import _  from "lodash";

const getBestProfession = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const { start, end }: any = req.query;
    const profession = await _getService().getBestProfession({ start, end })
    return res.send({ profession: _.get(_.first(profession), "Contractor.profession") });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const getBestClients = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const { start, end, limit }: any = req.query;
    const clients = await _getService().getBestClients({ start, end }, limit)
    return res.send({ clients: clients });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

const _getService = () => new AdminService(
  new ContractService(
    new ContractRepository(ContractModel)
  ),
  new ProfileService(new ProfileRepository(ProfileModel))
);

export {
  getBestProfession,
  getBestClients
}