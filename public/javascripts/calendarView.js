$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        eventClick: function(calEvent) {

        	localStorage["dateTime"] = Date.parse(calEvent.start);
        	localStorage["eventName"] = calEvent.title;
            localStorage["id"] = calEvent.id;
            console.log(calEvent.id);
            url = 'http://' + window.location.host + '/journal_entry.html'
            document.location.href = url;
		return false;


    	},
    	googleCalendarApiKey: 'AIzaSyBLhvEwf5xeIj6EFrnbI0AxZ9VVIU_6giQ',
        events: {
            googleCalendarId: 'ba9ura3nt0l78eobkdqb0rikd4@group.calendar.google.com'
        }
    })



});

