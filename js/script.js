
var viewModel = {
    street: ko.observable(""),
    city: ko.observable(""),
    mapsURL: ko.observable("https://maps.googleapis.com/maps/api/streetview?size=600x400&location=40.689556,-74.043539"),
    greeting: ko.observable("Where would you want to live?"),
    nytHeader: ko.observable("New York Times Articles"),
    wikiHeader: ko.observable("Relevant Wikipedia Links"),
    nytArticles: ko.observable("What's going on in your new city? Enter an address and hit submit and the NY Times will tell you here!"),
    nytArticleList: ko.observableArray(),
    wikiArticleList: ko.observableArray(),
    showDefault: ko.observable(true)
};

viewModel.address = ko.computed(function() {
    return viewModel.street() + ', ' + viewModel.city();
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

    //Update the background image
    viewModel.mapsURL('https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + viewModel.address());

    // Hide the default text
    viewModel.showDefault(false);

    // Get NYT links
    $.getJSON(viewModel.nytURL(), function(data) {
        //Loop through all articles
        var docLength = data.response.docs.length;
        for (var i = 0; i < docLength; i++) {
            var dataEntry = {};
            dataEntry.URL = data.response.docs[i].web_url;
            dataEntry.mainHeadline = data.response.docs[i].headline.main;
            dataEntry.snippet = data.response.docs[i].snippet;
            viewModel.nytArticleList.push(dataEntry);
        } 
    }
    //get Wikipedia articles

    );
};

ko.applyBindings(viewModel);


