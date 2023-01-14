import express from 'express';
import { BalanceController } from '../../src/controllers';

const balance = express.Router();

balance.post("/deposit/:userId", BalanceController.deposit);


export { balance };