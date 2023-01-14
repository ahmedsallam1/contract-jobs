import { DataTypes, Sequelize } from 'sequelize';

const ProfileSchema =   {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance:{
    type:DataTypes.DECIMAL(12,2)
  },
  type: {
    type: DataTypes.ENUM('client', 'contractor')
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
}

const associations = (models: any) => {
  models.Profile.hasMany(models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
  models.Profile.hasMany(models.Contract, {as : 'Client', foreignKey:'ClientId'})
}

export const profile = (sequelize: Sequelize) => {
  const model =  <any>sequelize.define(
    "Profile",
    ProfileSchema
  )
  model.associate = associations;

  return model;
}
