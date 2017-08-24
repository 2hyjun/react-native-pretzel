const router = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth');

router.use('/check', authMiddleware);

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/checkEmail', controller.checkEmailAuth);

router.get('/check', controller.check);
router.get('/emailAuthPage', controller.emailAuthPage);
module.exports = router;