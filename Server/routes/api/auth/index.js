const router = require('express').Router();
const controller = require('./auth.controller');
const controller2 = require('./auth.controller2');
const authMiddleware = require('../../../middlewares/auth');

router.use('/check', authMiddleware);

router.post('/register', controller2.register);
router.post('/login', controller.login);
router.get('/checkEmailAuth', controller2.checkEmailAuth);

router.get('/check', controller.check);
router.get('/emailAuthPage', controller.emailAuthPage);
module.exports = router;
