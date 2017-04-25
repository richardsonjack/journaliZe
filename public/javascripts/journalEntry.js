window.onload = function () {
	if(typeof localStorage["dateTime"] !='undefined'){
		var date = localStorage["dateTime"];
		document.getElementById("dateField").value = date;
    	localStorage.removeItem("dateTime");
	}
	if(typeof localStorage["eventName"] !='undefined'){
		var title = localStorage["eventName"];
		document.getElementById("eventTitle").value = title;
    	localStorage.removeItem("eventName");
	}
    
    

    
}