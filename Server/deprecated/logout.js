var express = require('express')
var router = express.Router();

router.get('/logout', (req, res) => {
    delete req.session.signedUser;
    res.send('logout success');
})

module.exports = router;