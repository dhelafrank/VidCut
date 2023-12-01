var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VidCut' });
});

router.get('/vo', function(req, res, next) {
  res.render('vo', { title: 'VidCut' });
});

module.exports = router;
