const express = require('express');
const router = express.Router();
const { getTopUsers, getTopOrLatestPosts } = require('../services/analyticsService.js');

router.get('/users', getTopUsers);
router.get('/posts', getTopOrLatestPosts);

module.exports = router;