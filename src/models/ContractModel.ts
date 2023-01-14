import { DataTypes, Sequelize } from 'sequelize';

const ContractSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  terms: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status:{
    type: DataTypes.ENUM('new','in_progress','terminated')
  }
}
const associations = (models: any) => {
  models.Contract.hasMany(models.Job, { foreignKey: "ContractId" })
  models.Contract.belongsTo(models.Profile, {as: 'Contractor'})
  models.Contract.belongsTo(models.Profile, {as: 'Client'})
}

export const contract = (sequelize: Sequelize) => {
  const model =  <any>sequelize.define(
    "Contract",
    ContractSchema
  )
  model.associate = associations;

  return model;
}
