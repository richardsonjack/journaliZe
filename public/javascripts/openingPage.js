var CLIENT_ID = '698609138587-inrvscb6seit9957dso0dr3rdmaf9ggv.apps.googleusercontent.com';
var xhr = new XMLHttpRequest();

//navigate to page function
function navigate(objButton){

	page = objButton.value;

	url = 'http://' + window.location.host + '/' + page;
    document.location.href = url;

}
//retrieve user info on signin
function onSignIn(googleUser) {
			        // Useful data for your client-side scripts:
			        var id_token = googleUser.getAuthResponse().id_token;
			        sendToken(id_token);
			        var profile = googleUser.getBasicProfile();
			        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
			        console.log('Full Name: ' + profile.getName());
			        console.log('Given Name: ' + profile.getGivenName());
			        console.log('Family Name: ' + profile.getFamilyName());
			        console.log("Image URL: " + profile.getImageUrl());
			        console.log("Email: " + profile.getEmail());

			        // The ID token you need to pass to your backend:
			        var googleUser = gapi.auth2.getAuthInstance().currentUser.get();
			        
			        console.log("ID Token: " + id_token);
			        

};
//signout function
function signOut() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }
//move to next page
function move() {
			   
	url = 'http://' + window.location.host + '/homepage.html'
		document.location.href = url;
			     
};
//send token to be authenticated
function sendToken(token){
	
	xhr.open('POST', 'http://localhost:3000/tokenSend',false);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.send('idtoken=' + token);	
	var x = document.getElementById('move_button');
	x.style.disabled = 'false';
}

			        