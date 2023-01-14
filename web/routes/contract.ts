import express from 'express';
import { ContractController } from "../../src/controllers/index";

const contract = express.Router();

contract.get("/:id", ContractController.getOne);
contract.get("/", ContractController.getAll);


export { contract };