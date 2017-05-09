// Client ID and API key from the Developer Console
      var CLIENT_ID = '698609138587-inrvscb6seit9957dso0dr3rdmaf9ggv.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      var start = new Date();
      start.setHours(0,0,0,0);

      var end = new Date();
      end.setHours(23,59,59,999);
      var heading = document.getElementById("dailyheader");
      var table = document.getElementById("daily_events");
      heading.innerHTML = start.toDateString();
      var allEvents;

      //var fs = require('fs');
      var xmlhttp = new XMLHttpRequest();


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
          listUpcomingEvents();
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
          xmlhttp.open("GET", "http://localhost:3000/journal.json", true);
          xmlhttp.send();
          
        });
      }

      listEntries = function(events,entries)
      {
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              when = event.start.dateTime;
              when = Date.parse(when);
              dateVal = new Date(when).toDateString();
              timeVal = new Date(when).customFormat("#h#:#mm# #AMPM#");
              if (!timeVal) {
                when = event.start.dateTime;
                when = Date.parse(when);
               // when = new Date(when).;
              }
              row = table.insertRow(i+1);
              eventName = row.insertCell(0);
              time = row.insertCell(1);
              journalEntry = row.insertCell(2);

              eventName.innerHTML = event.summary;
              time.innerHTML = timeVal;
              journalEntry.innerHTML = entries[dateVal][event.id].content;
            }
          }
      }

      

      xmlhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
              journal = JSON.parse(this.responseText);
              listEntries(allEvents,journal);
          }
      };
      



       function goToMakeEntry() {
            localStorage["dateTime"] = start.toDateString();
            url = 'http://' + window.location.host + '/journal_entry.html'
            document.location.href = url;
        }
