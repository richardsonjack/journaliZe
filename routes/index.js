var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/opening_page.html', {root: __dirname + '/public/'});
});

module.exports = router;
