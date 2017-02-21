var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Thermal Printer' });
});

router.post('/follow', function(req, res, next) {
  console.log(req.body)
});

router.post('/unfollow', function(req, res, next) {
  console.log(req.body)
});
module.exports = router;
