const { DataTypes, Model, INTEGER } = require("sequelize");
const User = require("./user");

// const sequelize = new Sequelize('mysql://root:@localhost:3306/sequelize_backend');
const { sequelize } = require("../db");

const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

Post.belongsTo(User, { foreignKey: "authorId" });
// const creator = User.hasMany(Post);

// UNCOMMENT NEXT LINE IF YOU UPDATED THE SCHEMA

// (async () => {
//     try {
//         await Post.sync({alter: true});
//         console.log('Table post is up to date!');
//     } catch (err) {
//         console.log('Something went wrong while creating model post!');
//     }
// })();

module.exports = { Post };
