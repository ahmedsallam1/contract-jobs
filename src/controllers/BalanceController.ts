
import { Request, Response } from 'express'
import { DB, JobModel, ProfileModel } from '../models';
import { JobRepository, ProfileRepository } from '../repositories';
import { BalanceService, JobService, ProfileService } from '../services';

const deposit = async (req: Request, res: Response): Promise<typeof res> => {
  try {
    const { amount } = req.body;
    await _getService().deposit(Number(req.params.userId), amount)
    return res.send({ deposit: true });
  } catch (error) {
    return res.status(500).send({ deposit: false, error: error.message });
  }
}

const _getService = () => {
  const profileService = new ProfileService(new ProfileRepository(ProfileModel));
  return new BalanceService(
    profileService,
    new JobService(
      new JobRepository(JobModel),
      profileService,
      DB
    ),
    DB
  );
};

export {
  deposit,
}