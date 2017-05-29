//function to navigate to another page
function navigate(objButton){

	page = objButton.value;

	url = 'http://' + window.location.host + '/' + page;
    document.location.href = url;

}