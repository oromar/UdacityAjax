
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
	    'api-key': NY_TIMES_API_KEY,
        'q': $street.val() + ', ' + $city.val()
	});	
	
	$.getJSON(url, function(data){
	    var items = [];
	    $.each(data.response.docs, function (e, val) {
	    	var $li = $('<li class="article"></li>');
			var $a = $('<a href="' + val.web_url + '" target="_blank"> ' + val.headline.main + '</a>');
			var $p = $('<p>' + val.snippet + '</p>')
			$li.append($a);
			$li.append($p);
			items.push($li);
		})
		$nytElem.append(items);
	}).error(function () {
	    var e = $('<h1>The new York Times Articles Could not be Loaded</h1>');
	    $nytElem.append(e);
	});

	function wikiCallback(data) {
	    console.log(data);
	}

	$.ajax({
        method: 'GET',
        url: 'https://en.wikipedQEQWEQWEQEQWEQWQWia.org/w/api.php',
        data: {
            action: 'opensearch',
            search: $city.val(),
            format: 'json',
            callback: loadData.wikiCallback
        },
        success: function (response) {
            console.log(response);
            var titles = response[1];
            $.each(titles, function (e, val) {
                var url = 'https://en.wikipedia.org/wiki/' + val;
                $wikiElem.append('<li class="article"> <a href="' + url + '" target="_blank">' + val + '</a></li>');
            });
        },        
        dataType: 'jsonp',
        //jsonp: callback
    });
    return false;
};

$('#form-container').submit(loadData);
