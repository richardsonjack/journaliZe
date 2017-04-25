$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        eventClick: function(calEvent) {

        	localStorage["dateTime"] = new Date(Date.parse(calEvent.start)).toDateString();
        	localStorage["eventName"] = calEvent.title;
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

