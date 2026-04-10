const express = require('express');
const router = express.Router();
const { fetchAndStorePosts, getPosts, getSinglePost } = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/fetch', fetchAndStorePosts);

module.exports = router;
