var entryID;
var date;
var title;
var xmlhttp = new XMLHttpRequest();
var sendhttp = new XMLHttpRequest();



window.onload = function () {
	if(typeof localStorage["dateTime"] !='undefined'){
		date = localStorage["dateTime"];
		document.getElementById("dateField").value = date;
    	localStorage.removeItem("dateTime");
	}
	if(typeof localStorage["id"] !='undefined'){
		entryID = localStorage["id"];
    	//localStorage.removeItem("id");
	}
	if(typeof localStorage["eventName"] !='undefined'){
		title = localStorage["eventName"];
		document.getElementById("eventTitle").value = title;
    	localStorage.removeItem("eventName");
	}
	date = document.getElementById("dateField").value;
	xmlhttp.open("GET", "http://localhost:3000/get_journal_day.json/" + date, true);

    xmlhttp.send();

	
	
	
}


submitEntry = function(){
		
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
          	console.log("test");
          	console.log(entryID);
          	if(journal[date])
          	{
          		if(journal[date][entryID]){
					nicEditors.findEditor('text_editor').setContent(journal[date][entryID].content)
				}
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


      	