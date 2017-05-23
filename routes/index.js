var express = require('express');
var GoogleAuth = require('google-auth-library');
var router = express.Router();

var fs = require('fs');
var path = require("path");
var rootPath = '/Users/JackRichardson/Documents/Uni/2017/WDC/journaliZe/public/';

var users;
var token;

var journalServer = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/', 'journal.json'),'UTF-8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.sendFile('/opening_page.html', {root: rootPath});
});

router.get('/get_journal_day/:date',function(req, res, next) {
  

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
		    var query = "SELECT * FROM journals WHERE eventID = ?"; // <-- THIS IS OUR SQL QUERY
		    connection.query(query, [req.params.id], function(err, rows, fields) { // run query
		        connection.release(); //release connection for more queries
		        console.log(rows); // print the query to console
		        res.json(rows); // send query response as JSON
		    });
		});

	});

router.post('/submitEntry',function(req, res, next){

	req.pool.getConnection( function(err,connection) { //Connect to the database
		    if (err) { // If there's a problem connecting
		        res.json({}); // Reply with empty JSON (or whatever you want to reply with)
		        throw err; // Exit with an error
		    }

		    var data = req.body;
		    title = data.title;
		    date = data.date;
		    content = data.content;
		    id = data.eventID;
		    time = data.time;

		    var query = "REPLACE INTO journals (date,title,content,eventID,time) VALUES (" + data + "," + title + "," + content + ","+id+","+time+") "; // <-- THIS IS OUR SQL QUERY
		    connection.query(query, function(err, rows, fields) { // run query
		        connection.release(); //release connection for more queries
		 		console.log("added")
		    });
		});


	res.end();
});

router.post('/tokenSend',function(req, res, next){
	token = req.body.token;
	if(!users)
	{
		req.pool.getConnection( function(err,connection) { //Connect to the database
		    if (err) { // If there's a problem connecting
		        res.json({}); // Reply with empty JSON (or whatever you want to reply with)
		        throw err; // Exit with an error
		    }
		    var query = "SHOW * FROM users"; // <-- THIS IS OUR SQL QUERY
		    connection.query(query, function(err, rows, fields) { // run query
		        connection.release(); //release connection for more queries
		        users = rows;
		        verifyToken(token);

		       
		    });
		});
	}else{
		verifyToken(token);
	}

	






	
  });


verifyToken = function(token){
	 var auth = new GoogleAuth;
				var client = new auth.OAuth2(CLIENT_ID, '', '');
				
				client.verifyIdToken(
			 	token,
			 	'738855749966-2u3bkpbodlpneirfrqt853h1mtrv1trr.apps.googleusercontent.com',
			  	function(e, login) {
			    var payload = login.getPayload();
			    var userid = payload['sub'];
			    var newUser = true;
			    // Search the users list for user with matching googleID
			    for (var i=0; i<users.length; i++){
			    	
			      	if (users[i].googleID === userid){
			      		newUser = false;
			      		users[i].session = req.sessionID;
			        	console.log(users[i].name+" logged in.");
			      	}
			    }
			    if (newUser === true){
			      	var user = {'name':payload['name'], 'email':payload['email'], 'googleID':userid};
			      	users.push(user);
			     	console.log(user.name+" created and logged in.");
			    }	
}




module.exports = router;
