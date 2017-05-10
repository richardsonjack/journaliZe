var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/opening_page.html', {root: __dirname + '/public/'});
});


router.post('/write_journal.json',function(req, res, next){
	//fs.writeFile(__dirname + '/public/journal.json',req.body);
	console.log('written');
	res.send();
});

router.get('/journal.json',function(req, res, next) {
  console.log('TEST')
  res.sendFile('/journal.json', {root: __dirname + '/public/'});
});


module.exports = router;
