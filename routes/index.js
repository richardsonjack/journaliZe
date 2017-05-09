var express = require('express');
var router = express.Router();

var fs = require('fs')
var journal;

/* GET home page. */
router.get('/', function(req, res, next) {

	res.sendFile('/opening_page.html', {root: __dirname + '/public/'});
});

router.get('journal.json',function(req, res, next) {
  if(!journal)
	{
		res.sendFile('/journal.json', {root: __dirname + '/public/'});

	}else
	{
		res.sendFile(journal)
	}
});

router.post('journal.json',function(req,res,next){
// 	fs.writeFile('/journal.json',req.body, 'utf-8', function(err) {
// 	if (err) throw err
// 	console.log('Done!')
// });
	journal = req.body;
	res.end();
});

module.exports = router;
