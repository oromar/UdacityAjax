
function loadData() {

	var streetViewURL =  "http://maps.googleapis.com/maps/api/streetview?size=1024x768&location=";

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
	
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");	
	
    // load streetview
	// YOUR CODE GOES HERE!
	
	var $street = $('#street');
	var $city = $('#city');	
	var result = streetViewURL + $street.val() + ", " + $city.val();
	$body.append('<img class="bgimg" src="' + result + '">');
    return false;
};

$('#form-container').submit(loadData);
