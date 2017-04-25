window.onload = function () {
    var date = localStorage["dateTime"];
    console.log(date);
    document.getElementById("dateField").value = date;
    localStorage.removeItem("dateTime");
}