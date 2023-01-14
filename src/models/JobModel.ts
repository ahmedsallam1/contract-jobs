import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const JobSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(12,2),
    allowNull: false
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  paymentDate:{
    type: DataTypes.DATE
  }
}

const associations = (models: any) => {
  models.Job.belongsTo(models.Contract)
}

export const job = (sequelize: Sequelize) => {
  const model = <any>sequelize.define(
    "Job",
    JobSchema
  )
  model.associate = associations;

  return model;
}