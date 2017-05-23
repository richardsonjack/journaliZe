var CLIENT_ID = '698609138587-inrvscb6seit9957dso0dr3rdmaf9ggv.apps.googleusercontent.com';
var xhr = new XMLHttpRequest();
function navigate(objButton){

	page = objButton.value;

	url = 'http://' + window.location.host + '/' + page;
    document.location.href = url;

}
function onSignIn(googleUser) {
			        // Useful data for your client-side scripts:
			        var profile = googleUser.getBasicProfile();
			        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
			        console.log('Full Name: ' + profile.getName());
			        console.log('Given Name: ' + profile.getGivenName());
			        console.log('Family Name: ' + profile.getFamilyName());
			        console.log("Image URL: " + profile.getImageUrl());
			        console.log("Email: " + profile.getEmail());

			        // The ID token you need to pass to your backend:
			        var googleUser = gapi.auth2.getAuthInstance().currentUser.get();
			        var id_token = googleUser.getAuthResponse().id_token;
			        console.log("ID Token: " + id_token);
			        sendToken(id_token);

};
function signOut() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }

function move() {
			    if(GoogleAuth.isSignedIn.get()){
			    	url = 'http://' + window.location.host + '/homepage.html'
           			document.location.href = url;
			    }    
};

function sendToken(token){
	
	xhr.open('POST', 'http://localhost:3000/tokenSend');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.send('idtoken=' + token);	
}



xhr.onload = function() {
  //console.log('Signed in as: ' + xhr.responseText);
  move();
};			        