var entryID;
var date;
var title;


window.onload = function () {
	if(typeof localStorage["dateTime"] !='undefined'){
		date = localStorage["dateTime"];
		document.getElementById("dateField").value = date;
    	localStorage.removeItem("dateTime");
	}
	if(typeof localStorage["eventName"] !='undefined'){
		title = localStorage["eventName"];
		document.getElementById("eventTitle").value = title;
    	localStorage.removeItem("eventName");
	}
	if(typeof localStorage["id"] !='undefined'){
		entryID = localStorage["id"];
    	localStorage.removeItem("id");
	}
   
}

var xmlhttp = new XMLHttpRequest();

submitEntry = function(){
		xmlhttp.open("GET", "http://localhost:3000/journal.json", true);

        xmlhttp.send();
}



xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
	          journal = JSON.parse(this.responseText);
	          console.log(journal);
	          console.log(entryID);
	          console.log(date);
	          date = document.getElementById("dateField").value;
	          title = document.getElementById("eventTitle").value;
	          content = nicEditors.findEditor('text_editor').getContent();
	          if(!journal[date])
	          {
	          	journal[date] = {}
	          }
	          
	          journal[date][entryID] = {"eventID" :  entryID,"time" :  Date.parse(date) ,"title" : title ,"content" : content};

	          console.log(JSON.stringify(journal));

	          posting();


	         

	          

              
 };
}

posting = function()
{
	var sendhttp = new XMLHttpRequest();

	 sendhttp.open("POST","http://localhost:3000/write_journal.json",true)
	         // sendhttp.setRequestHeader("content-type","application/json");
	          sendhttp.send(JSON.stringify(journal));

	sendhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
          	url = 'http://' + window.location.host + '/dailyView.html'
   				document.location.href = url;

		     }
		};	          
}


      	