
import { Request, Response } from 'express'
import { JobRepository, ProfileRepository } from '../repositories';
import { JobService, ProfileService } from '../services';
import { JobModel, ProfileModel, DB } from "../models";

const getUnpaid = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const contract = await _getService().getActiveUnpaid(Number(req.get("profile_id")))
    return res.send({ data: contract });
  } catch (error) {
    console.log(error)
  }
}

const pay = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const contract = await _getService().pay(Number(req.params.id))
    return res.send({ paid: contract });
  } catch (error) {
    return res.status(500).send({ paid: false,  error: error.message });
  }
}

const _getService = () => new JobService(
  new JobRepository(JobModel),
  new ProfileService(new ProfileRepository(ProfileModel)),
  DB
);

export {
  getUnpaid,
  pay
}