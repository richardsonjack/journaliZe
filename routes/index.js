var express = require('express');
var GoogleAuth = require('google-auth-library');
var router = express.Router();

var fs = require('fs');
var path = require("path");
var rootPath = '/Users/JackRichardson/Documents/Uni/2017/WDC/journaliZe/public/';

var journalServer = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/', 'journal.json'),'UTF-8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.sendFile('/opening_page.html', {root: rootPath});
});

router.get('/get_journal_day.json/:date',function(req, res, next) {
  

	req.pool.getConnection( function(err,connection) { //Connect to the database
	    if (err) { // If there's a problem connecting
	        res.json({}); // Reply with empty JSON (or whatever you want to reply with)
	        throw err; // Exit with an error
	    }
	    var query = "SHOW * FROM journals WHERE DATE = ?"; // <-- THIS IS OUR SQL QUERY
	    connection.query(query, [req.params.date], function(err, rows, fields) { // run query
	        connection.release(); //release connection for more queries
	        console.log(rows); // print the query to console
	        res.header("Content-Type",'application/json');
	        res.json(rows); // send query response as JSON
	    });
	});
});

router.get('/get_journal_event.json/:id',function(req, res, next) {
  
  

	req.pool.getConnection( function(err,connection) { //Connect to the database
		    if (err) { // If there's a problem connecting
		        res.json({}); // Reply with empty JSON (or whatever you want to reply with)
		        throw err; // Exit with an error
		    }
		    var query = "SHOW * FROM journals WHERE eventID = ?"; // <-- THIS IS OUR SQL QUERY
		    connection.query(query, [req.params.id], function(err, rows, fields) { // run query
		        connection.release(); //release connection for more queries
		        console.log(rows); // print the query to console
		        res.json(rows); // send query response as JSON
		    });
		});

	});

router.post('/journal.json',function(req, res, next){
	journalServer = req.body;
	res.end();
});

router.post('/tokenSend',function(req, res, next){
	
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + req.body.idtoken, true);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
          	
          	var response = this.responseText;
			
          	res.send(response.email);
	        res.end();   
	           

          
		 };

}

	
});




module.exports = router;
