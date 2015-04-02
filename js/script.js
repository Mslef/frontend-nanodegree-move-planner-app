
var viewModel = {
    street: ko.observable(""),
    city: ko.observable(""),
    greeting: ko.observable("Where would you want to live?"),
    nytHeader: ko.observable("New York Times Articles"),
    wikiHeader: ko.observable("Relevant Wikipedia Links"),
    nytArticles: ko.observable("What's going on in your new city? Enter an address and hit submit and the NY Times will tell you here!")
};

viewModel.address = ko.computed(function() {
    return viewModel.street() + ', ' + viewModel.city();
}, viewModel);

// Google Street View URL
viewModel.mapsURL = ko.computed(function() {
    return 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + viewModel.address();
}, viewModel);

// NYT URL
viewModel.nytURL = ko.computed(function() {
    return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + viewModel.address()+'&=sort=newest&api-key=773fe7f4f46bee0b96f79fa100da469a:11:71760315';
}, viewModel);
        
// Update the view
viewModel.loadData = function() {
    var $wikiElem = $('#wikipedia-links');
    var $nytElem = $('#nytimes-articles');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //Update the greeting
    viewModel.greeting('So, you want to live at ' + viewModel.address() + '?');
    // Update NYT header
    viewModel.nytHeader('New York Times articles about ' + viewModel.address());
    // Update Wiki header
    viewModel.wikiHeader('Wikipedia articles about ' + viewModel.address());

    // load streetview
    $('body').css('background-image', 'url(\"'+viewModel.mapsURL() +'\")');
    $('body').css('background-size', 'cover');

    // Get NYT links
    $.getJSON(viewModel.nytURL(), function(data) {
        //Loop through all articles
        var docLength = data.response.docs.length;
        for (var i = 0; i < docLength; i++) {
            var article = data.response.docs[i];
            $nytElem.append('<li class="article"><a href=' + article.web_url + '>'+ article.headline.main + '<p>' + article.snippet + '</p></li>');
        } 
    }
    //get Wikipedia articles

    );
};

ko.applyBindings(viewModel);