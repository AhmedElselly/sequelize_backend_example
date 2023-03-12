const { Sequelize, DataTypes, Model } = require("sequelize");
const Post = require("./post");
// const sequelize = new Sequelize('mysql://root:@localhost:3306/sequelize_backend');
const { sequelize } = require("../db");

// class User extends Model {}

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

// UNCOMMENT NEXT LINE IF YOU UPDATED THE SCHEMA

// (async () => {
//     try {
//         await User.sync({alter: true});
//         console.log('Table user is up to date!');
//     } catch (err) {
//         console.log('Something went wrong while creating model user!');
//     }
// })();

module.exports = User;
