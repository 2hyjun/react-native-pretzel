const router = require("express").Router();
const controller = require('./timeline.controller');
const authMiddleware = require("../../../middlewares/auth");

router.use('/', authMiddleware);

router.get(['/:type', '/'], controller.timeline);
router.delete(['/:rid', '/'], controller.delete);
router.post('/', controller.post);
router.put(['/', '/:rid'], controller.update);
router.get('/mypage', controller.mypage);

module.exports = router