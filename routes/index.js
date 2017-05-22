var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require("path");
var rootPath = '/Users/JackRichardson/Documents/Uni/2017/WDC/journaliZe/public/';

var journalServer = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/', 'journal.json'),'UTF-8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.sendFile('/opening_page.html', {root: rootPath});
});

router.get('/get_journal.json/:date',function(req, res, next) {
  
  console.log(req.params.date);
  res.header("Content-Type",'application/json');
  res.json(journalServer);
});

router.post('/journal.json',function(req, res, next){
	journalServer = req.body;
	res.end();
});




module.exports = router;
