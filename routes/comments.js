const express = require('express');
const {create, getComment } = require('../controllers/comments');
const router = express.Router();


router.post('/create/:authorId/:postId', create);
router.get('/comment/:postId', getComment);

module.exports = router;