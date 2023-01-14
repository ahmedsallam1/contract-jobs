import express from 'express';
import { JobController } from "../../src/controllers/index";

const job = express.Router();

job.get("/unpaid", JobController.getUnpaid);
job.post("/:id/pay", JobController.pay);

export { job };