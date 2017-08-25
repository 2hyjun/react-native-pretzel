const router = require('express').Router();
const controller = require('./timeline.controller');
const authMiddleware = require('../../../middlewares/auth');

router.use('/', authMiddleware);

router.get('/', controller.timeline);
router.delete(['/:rid', '/'], controller.delete);
router.post('/', controller.post);
router.put(['/', '/:rid'], controller.update);
router.get('/mypage', controller.mypage);
router.put(['/completing/:rid', '/completing'], controller.completing);

module.exports = router;