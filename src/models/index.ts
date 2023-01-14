import { profile } from "./ProfileModel";
import { Sequelize } from "sequelize";
import { contract } from "./ContractModel";
import { job } from "./JobModel";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});
  
const Contract = contract(sequelize);
const Job = job(sequelize);
const Profile = profile(sequelize);

const models = { Contract, Job, Profile };

for (const name in models) {
  models[name].associate(models)
}

export {
  Contract as ContractModel,
  Job as JobModel,
  Profile as ProfileModel,
  sequelize as DB
}
