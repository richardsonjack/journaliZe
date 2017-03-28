$(function() {
	// (Optional) Active an item if it has the class "is-active"	
	$(".accordion > .accordion-used.is-active").children(".accordion-info").slideDown();
	
	$(".accordion > .accordion-used").click(function() {
		// Cancel the siblings
		$(this).siblings(".accordion-used").removeClass("is-active").children(".accordion-info").slideUp();
		// Toggle the item
		$(this).toggleClass("is-active").children(".accordion-info").slideToggle("ease-out");
	});
});