const express = require("express");
const passport = require("passport");
const router = express.Router();

const { create, getPost } = require("../controllers/posts");

router.get('/secret', passport.authenticate('jwt'), (req, res) => {
    
    return res.json({message: 'secret reached out!'});
});

router.post("/create", create);
router.get("/post/:postId", getPost);

module.exports = router;
