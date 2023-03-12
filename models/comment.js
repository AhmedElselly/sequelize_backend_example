const {Sequelize, DataTypes, Model} = require('sequelize');
const { Post } = require('./post');
const User = require('./user');

// const sequelize = new Sequelize('mysql://root:@localhost:3306/sequelize_backend');
const {sequelize} = require('../db');

class Comment extends Model {}

Comment.init({
    text: {
        type: DataTypes.STRING
    },
    authorId: {
        type: DataTypes.INTEGER
    },
    postId: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    modelName: 'Comment',
    timestamps:true
});

Comment.belongsTo(User, {foreignKey: 'authorId'});
Comment.belongsTo(Post, {foreignKey: 'postId'});
// const postBelong = Post.hasMany(Comment);

// (async () => {
//     try {
//         await Comment.sync({alter: true});
//         console.log('Table comment is up to date!');
//     } catch (err) {
//         console.log('Something went wrong while creating model comment!');
//     }
// })();

// module.exports = {Comment, postBelong};
module.exports = {Comment};