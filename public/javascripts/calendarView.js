$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        dayClick: function() {
        alert('a day has been clicked!');
    	},
    	googleCalendarApiKey: 'AIzaSyBLhvEwf5xeIj6EFrnbI0AxZ9VVIU_6giQ',
        events: {
            googleCalendarId: 'ba9ura3nt0l78eobkdqb0rikd4@group.calendar.google.com'
        }
    })



});