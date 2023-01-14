import express from 'express';
import { AdminController } from '../../src/controllers';

const admin = express.Router();

admin.get("/best-profession", AdminController.getBestProfession);
admin.get("/best-clients", AdminController.getBestClients);

export { admin };