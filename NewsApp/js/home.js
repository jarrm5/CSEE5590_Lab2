

$(document).ready(function(){

    $('#news-sources').html(populate_news_outlets());

    $('#btn-search').on('click',function(){

        $('#news-articles-container').html('');

        var topic = $('#inp-topic').val().trim();

        var selected = [];
        $.each($('input:checkbox:checked'),function(){
            selected.push($(this).val());
        });

        
        if((topic !== "") && (selected.length != 0)){
            for(var i = 0; i < selected.length; i++){
                get_articles_by_topic_and_source(topic,selected[i]);
            }   
        }
        else{
            if(topic !== ""){
                get_articles_by_topic(topic);
            }
            
            if(selected.length != 0){
                for(var i = 0; i < selected.length; i++){
                    get_articles_by_sources(selected[i]);
                }    
            }
        }

        //reset();
        
    //validation goes here

    });

    $('#btn-reset').on('click', function(){
        reset();
    });
});

function get_articles_by_sources(source){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url:  'https://newsapi.org/v2/top-headlines?' +
            'language=en&' +
            'sources=' + source + '&' +
            'sortBy=relevancy&' +
            'pageSize=3&' +
            'apiKey=4e7410f126044cd0807b3f536176ea48',
    }).done(function(data) {

        if(data['totalResults'] == 0){
            console.log('no results found');
        }
        else{
            for(var i = 0; i < data['articles'].length; i++){
                $('#news-articles-container').append(get_articles_html(data["articles"][i]));
            }
        }

    }).fail(function(data) {
        console.log(data);
    });
}

function get_articles_by_topic(topic){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url:  'https://newsapi.org/v2/everything?' +
            'language=en&' +
            'q=' + topic + '&' +
            'sortBy=relevancy&' +
            'pageSize=25&' +
            'apiKey=4e7410f126044cd0807b3f536176ea48',
    }).done(function(data) {

        if(data['totalResults'] == 0){
            console.log('no results found');
        }
        else{
            for(var i = 0; i < data['articles'].length; i++){
                $('#news-articles-container').append(get_articles_html(data["articles"][i]));
            }
        }

    }).fail(function(data) {
        console.log(data);
    });
}

function get_articles_by_topic_and_source(topic,source){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url:  'https://newsapi.org/v2/everything?' +
            'language=en&' +
            'q=' + topic + '&' +
            'sources=' + source + '&' +
            'sortBy=relevancy&' +
            'pageSize=3&' +
            'apiKey=4e7410f126044cd0807b3f536176ea48',
    }).done(function(data) {

        if(data['totalResults'] == 0){
            console.log('no results found');
        }
        else{
            for(var i = 0; i < data['articles'].length; i++){
                $('#news-articles-container').append(get_articles_html(data["articles"][i]));
            }
        }


    }).fail(function(data) {
        console.log(data);
    });
}

function populate_news_outlets(){
    var html = '';
    var outlets = get_news_outlets();
    for(var i = 0; i < outlets.length; i++){
        html += '<div class=\'news-outlet-container\'>' + 
                    '<div class=\'inp-sources\'>' +
                        '<label class=\'checkbox-inline\'><input type=\'checkbox\' value=\'' + outlets[i].id  +'\'>' + outlets[i].name + '</label>' +
                    '</div>' + 
                    '<div class=\'news-img-container\'>' + 
                        '<img class=\'news-img-container\' src =\'../img/' + outlets[i].img + '\'>' +
                    '</div>' +
                '</div>';
    }
    return html;
}

function get_articles_html(data){

    var date = new Date(data['publishedAt']);

    return  '<div class=\'news-article\'>' + 
                '<div class=\'news-article-img\'>' +
                    '<a href=\'' + data['url'] + '\'><img src=\'' + data['urlToImage'] + '\'></a>' +
                '</div>' +
                '<div class=\'news-article-content\'>' + 
                    '<h2>' + data['title'] + '</h2>' + 
                    '<span>'+ data['source']['name']+ ' - ' + (date.getMonth()+1) + '/' + (date.getDay()+1) + '/' + date.getFullYear() + '</span>' +
                    '<p>' + data['description'] + '</p>' + 
                '</div>' +
            '</div>';
}

function reset(){
    $('#inp-topic').val('');

    $.each($('input:checkbox:checked'),function(){
        $(this).attr('checked',false);
    });  
}

function NewsOutlet(id,name,img){
    this.id = id;
    this.name = name;
    this.img = img;
}

function get_news_outlets(){
    return [
        new NewsOutlet('abc-news','ABC News','abc.PNG'),
        new NewsOutlet('bbc-news','BBC News','bbc.PNG'),
        new NewsOutlet('bleacher-report','Bleacher Report','bleacherreport.PNG'),
        new NewsOutlet('cbs-news','CBS News','cbs.PNG'),
        new NewsOutlet('cnn','CNN','cnn.PNG'),
        new NewsOutlet('daily-mail','The Daily Mail','dmail.PNG'),
        new NewsOutlet('fox-news','Fox News','fox.PNG'),
        new NewsOutlet('msnbc','MSNBC','msnbc.PNG'),
        new NewsOutlet('the-new-york-times','The New York Times','nyt.PNG'),
        new NewsOutlet('usa-today','USA Today','usa.PNG'),      
        new NewsOutlet('the-huffington-post','The Huffington Post','Huffpost.jpg'),
        new NewsOutlet('the-wall-street-journal','The Wall Street Journal','wsj.PNG')      
    ];
}

