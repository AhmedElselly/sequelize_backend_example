const Post = require("../models/post");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  async register(req, res) {
    const user = User.build(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    return res.json(user);
  },

  async login(req, res) {
    const user = await User.findOne({where: {email: req.body.email}});
    if(!user) return res.status(400).json({message: 'No user with such email!'});
    const confirmed = bcrypt.compareSync(req.body.password, user.password);
    if(!confirmed) return res.status(400).json({message: 'Email and password don\'t match!'});
    const token = jwt.sign({id: user.id, username: user.username, email: user.email}, process.env.SECRETKEY);
    return res.json({token, user});
  },

	async update(req, res) {
		const {email, username} = req.body;
		const user = await User.findOne({where: {id: req.params.userId}});
		if(email) user.email = req.body.email;
		if(username) user.username = req.body.username;
		await user.save();
		return res.json(user);
	},

  async getUserPosts(req, res) {
    const user = await User.findOne({include: [{
      model: Post,
      as: 'post'
    }], where: {id: req.params.userId}});
    return res.json(user);
  }
};
