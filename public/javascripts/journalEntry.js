var entryID;
var date;
var title;
var xmlhttp = new XMLHttpRequest();
var sendhttp = new XMLHttpRequest();



window.onload = function () {
	if(typeof localStorage["dateTime"] !='undefined'){
		console.log(localStorage["dateTime"]);
		date = new Date(parseInt(localStorage["dateTime"]));
		console.log(date);
		document.getElementById("dateField").value = date.toDateString();
    	localStorage.removeItem("dateTime");
	}
	if(typeof localStorage["id"] !='undefined'){
		entryID = localStorage["id"];
    	localStorage.removeItem("id");
	}
	if(typeof localStorage["eventName"] !='undefined'){
		title = localStorage["eventName"];
		document.getElementById("eventTitle").value = title;
    	localStorage.removeItem("eventName");
	}
	xmlhttp.open("GET", "http://localhost:3000/get_journal_event.json/" + entryID, true);

    xmlhttp.send();

	
	
	
}


submitEntry = function(){
		
	    title = document.getElementById("eventTitle").value;
	    content = nicEditors.findEditor('text_editor').getContent();
	    
        console.log(date);
        var myDate = new Date(date);
        var sendDate = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate();
        var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
        var newEntry = {"eventID" :  entryID,"date" :  sendDate, "time": time,"title" : title ,"content" : content};

          

        sendhttp.open("POST","http://localhost:3000/submitEntry",true)
		sendhttp.setRequestHeader("content-type","application/json");
		sendhttp.send(JSON.stringify(newEntry)); 
}



xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
          	journal = JSON.parse(this.responseText);
          	console.log(journal);
          	if(journal[0])
          	{
          		console.log("test");
          		if(journal[0].content){
          			console.log("test");
					nicEditors.findEditor('text_editor').setContent(journal[0].content)
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


      	