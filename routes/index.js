var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/opening_page.html', {root: __dirname + '/public/'});
});

router.get('journal.json',function(req, res, next) {
  res.sendFile('/journal.json', {root: __dirname + '/public/'});
});

module.exports = router;
