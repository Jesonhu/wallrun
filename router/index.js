let express = require('express'),
    router = express.Router();


/**
 * 路由 
 */
router.get('/', (req, res) => {
    // do something
});
// 404
router.use((req, res) => {
    res.status(404),render('404');
});

module.exports = router;