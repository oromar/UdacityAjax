
var NY_TIMES_API_KEY = '8224a4fc959b4684b1fc59d76cffff96';

function loadData() {

	var streetViewURL =  "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=";

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
	
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': NY_TIMES_API_KEY
	});
	url += '&' + $.param({
		'q': $street + ', ' + $city
	});
	
	$.getJSON(url, function(data){
		var items = [];
		$.each(data.response.docs, function(e, val) {
			var $li = $('<li class="article"></li>');
			var $a = $('<a href="' + val.web_url + '" target="_blank"> ' + val.headline.name + '</a>');
			var $p = $('<p>' + val.lead_paragraph + '</p>')
			$li.append($a);
			$li.append($p);
			items.push($li);
		})
		$nytElem.append(items);
	});
	
	
	
	
	
    return false;
};

$('#form-container').submit(loadData);
