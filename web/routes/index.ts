import express from 'express';
import { contract } from "./contract";
import { job } from "./job";
import { balance } from "./balance";
import { admin } from './admin';

const router = express.Router();

router.use("/contracts", contract);
router.use("/jobs", job);
router.use("/balances", balance);
router.use("/admin", admin);

export {
  router
};