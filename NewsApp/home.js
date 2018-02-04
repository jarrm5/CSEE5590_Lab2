function get_articles(){
    $.ajax({
      type: "GET",
      dataType: 'json',
      url:  'https://newsapi.org/v2/everything?'+
            'sources=ars-technica&' +
            //'q=bitcoin&'+
            //'from=2018-02-04&' +
            'sortBy=popularity&' +
            'apiKey=4e7410f126044cd0807b3f536176ea48',
    }).done(function(data) {
      console.log(data);
    }).fail(function(data) {
      console.log(data)
    });
}

$(document).ready(function(){
    get_articles();
});


/*var url = 'https://newsapi.org/v2/everything?' +
          'q=Politics&' +
          'from=2018-02-04&' +
          'sortBy=popularity&' +
          'apiKey=4e7410f126044cd0807b3f536176ea48';

var req = new Request(url);

fetch(req).then(function(response) {
    console.log(response.json());
});*/