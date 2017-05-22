var entryID;
var date;
var title;


window.onload = function () {

	xmlhttp.open("GET", "http://localhost:3000/get_journal.json", true);
    xmlhttp.send();

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
var sendhttp = new XMLHttpRequest();

submitEntry = function(){
		date = document.getElementById("dateField").value;
	    title = document.getElementById("eventTitle").value;
	    content = nicEditors.findEditor('text_editor').getContent();
	    if(!journal[date])
        {
       		journal[date] = {}
        }
          
        journal[date][entryID] = {"eventID" :  entryID,"time" :  Date.parse(date) ,"title" : title ,"content" : content};

          

        sendhttp.open("POST","http://localhost:3000/journal.json",true)
		sendhttp.setRequestHeader("content-type","application/json");
		sendhttp.send(JSON.stringify(journal)); 
}



xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
          	journal = JSON.parse(this.responseText);
          	if(journal[date][entryID])
          	{
				nicEditors.findEditor('text_editor').setContent(journal[date][entryID].content)
          	}

			

	          
	           

          
 };
}

sendhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){

          	localStorage["todayDate"] = date;

          	url = 'http://' + window.location.host + '/dailyView.html'
   			document.location.href = url;

		}

		};	


      	