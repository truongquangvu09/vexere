"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trip }) {
      // define association here
      this.hasMany(Trip, { foreignKey: "fromStation",as:'from' });
      this.hasMany(Trip, { foreignKey: "toStation",as:'to' });

    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          checkLen(value) {
            if (value.length >= 5 && value.length <= 20) {
              return true;
            } else {
              throw new Error("do dai phai tu t den 20");
            }
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["HCM", "DN", "HN"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
