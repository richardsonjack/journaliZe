// Client ID and API key from the Developer Console
      var CLIENT_ID = '698609138587-inrvscb6seit9957dso0dr3rdmaf9ggv.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
      //declare vars and get ids
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
      var today;


      //manage date
      if(typeof localStorage["todayDate"] !='undefined'){
          today = new Date(localStorage["todayDate"]).toDateString();
          localStorage.removeItem("todayDate");
          var start = new Date(Date.parse(today));
          var end = new Date(Date.parse(today));
      }else
      {
          var start = new Date();
          var end = new Date();
      }
      start.setHours(0,0,0,0);
      end.setHours(23,59,59,999);
      today = start;

      //retrieve elements
      var heading = document.getElementById("dailyheader");
      var table = document.getElementById("daily_events");
      heading.innerHTML = today.toDateString();
      var allEvents;

      //create AJAX object
      var xmlhttp = new XMLHttpRequest();

      //Define date formatting function
      Date.prototype.customFormat = function(formatString){
        var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
        YY = ((YYYY=this.getFullYear())+"").slice(-2);
        MM = (M=this.getMonth()+1)<10?('0'+M):M;
        MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
        DD = (D=this.getDate())<10?('0'+D):D;
        DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
        th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
        formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
        h=(hhh=this.getHours());
        if (h==0) h=24;
        if (h>12) h-=12;
        hh = h<10?('0'+h):h;
        hhhh = hhh<10?('0'+hhh):hhh;
        AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
        mm=(m=this.getMinutes())<10?('0'+m):m;
        ss=(s=this.getSeconds())<10?('0'+s):s;
        return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
      };


      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          gapi.auth2.getAuthInstance().signIn();
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
          listUpcomingEvents();
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        
        gapi.client.calendar.events.list({
          'calendarId': 'ba9ura3nt0l78eobkdqb0rikd4@group.calendar.google.com',
          'timeMin': (start).toISOString(),
          'timeMax': (end).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 20,
          'orderBy': 'startTime'
        }).then(function(response) {
          allEvents = response.result.items;
          var date = start.customFormat("#YYYY#-#MM#-#DD#");

          xmlhttp.open("GET", "http://localhost:3000/get_journal_day/" + date, true);
          console.log(date);
          xmlhttp.send();
          
        });
      }


      //list the journal entriels, creating table cells and populating from database and calendar API
      listEntries = function(events,entries)
      {
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              //get event and details
              var event = events[i];
              when = event.start.dateTime;
              when = Date.parse(when);
              dateVal = new Date(when).toDateString();
              timeVal = new Date(when).customFormat("#h#:#mm# #AMPM#");
              if (!timeVal) {
                when = event.start.dateTime;
                when = Date.parse(when);
              }
              row = table.insertRow(i+1);
              eventName = row.insertCell(0);
              time = row.insertCell(1);
              journalEntry = row.insertCell(2);
              //cell click function
              clickFunc = function(_event){
                                            return function(){
                                              localStorage["eventName"] = _event.summary;
                                              localStorage["dateTime"] = Date.parse(_event.start.dateTime);
                                              localStorage["id"] = _event.id;
                                              url = 'http://' + window.location.host + '/journal_entry.html'
                                              document.location.href = url;
                                            }
              }
              row.onclick = clickFunc(event);

              eventName.innerHTML = event.summary;
              time.innerHTML = timeVal;

              
              //populate table with db entries
              for (var x = entries.length - 1; x >= 0; x--) {
                if(entries[x].eventID == event.id)
                {

                  journalEntry.innerHTML = entries[x].content;
                }
              }
            }
          }
      }
      //clear table and reset to default
      clearTable = function()
      {
        table.innerHTML = "<tr id = tableHeader><th>Event</th><th>Time</th><th>Journal Entry</th></tr>"
      }
      //display table for next day
      nextDay = function()
      {
        clearTable();
        start.setDate(start.getDate()+1);
        end.setDate(end.getDate()+1);
        listUpcomingEvents();
        today = start;
        heading.innerHTML = today.toDateString();
      }
      //display table for previous day
      lastDay = function()
      {
        clearTable();
        start.setDate(start.getDate()-1);
        end.setDate(end.getDate()-1);
        listUpcomingEvents();
        today = start;
        heading.innerHTML = today.toDateString();
      }

      
      //retrieve entries for database and parse
      xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
              journal = JSON.parse(this.responseText);
              console.log(journal);
              listEntries(allEvents,journal);
          }
      };
      


        //go to make entry page
       function goToMakeEntry() {
            localStorage["dateTime"] = Date.parse(start);
            localStorage["id"] = Math.random();
            url = 'http://' + window.location.host + '/journal_entry.html'
            document.location.href = url;
        }
