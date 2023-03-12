const express = require('express');
const router = express.Router();

const { register, login, update, getUserPosts } = require('../controllers/users');

router.post('/register', register);
router.post('/login', login);
router.put('/user/:userId', update);
router.get('/posts/:userId', getUserPosts);

module.exports = router;