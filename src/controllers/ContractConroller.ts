
import { Request, Response } from 'express'
import { ContractRepository } from '../repositories';
import { ContractService } from '../services';
import { ContractModel } from "../models";

const getOne = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const contract = await _getService().getOneBy(Number(req.params.id), Number(req.get("profile_id")))
    return res.send({ data: contract });
  } catch (error) {
    console.log(error)
  }
}

const getAll = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const contracts = await _getService().getNonTerminatedBy(Number(req.get("profile_id")))
    return res.send({ data: contracts });
  } catch (error) {
    console.log(error)
  }
}

const _getService = () => new ContractService(
  new ContractRepository(ContractModel)
);

export {
  getOne,
  getAll
}