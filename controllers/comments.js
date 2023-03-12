const { Comment } = require("../models/comment");
const { Post } = require("../models/post");
const User = require("../models/user");

module.exports = {
  async create(req, res) {
    const comment = Comment.build(req.body);
    comment.authorId = req.params.authorId;
    comment.postId = req.params.postId;
    await comment.save();
    return res.json(comment);
  },

  async getComment(req, res) {
    const comment = await Comment.findOne({
      where: { postId: req.params.postId },
      include: [{ model: Post }, { model: User }],
    });
    return res.json(comment);
  },
};
