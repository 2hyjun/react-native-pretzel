const router = require('express').Router();
const auth = require('./auth');
const timeline = require('./timeline');

router.use('/auth', auth);
router.use('/timeline', timeline)

module.exports = router;