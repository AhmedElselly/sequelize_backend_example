const { Post } = require("../models/post");
const User = require("../models/user");

module.exports = {
  async create(req, res) {
    const post = Post.build(req.body);
    post.authorId = req.body.authorId;
    await post.save();
    return res.json(post);
  },

  async getPost(req, res) {
    try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: { model: User },
    });
    return res.json(post);
  } catch(err) {
    console.log(err)
    return res.status(400).json({message: 'Something went wrong:', err});
  }
  },
};
