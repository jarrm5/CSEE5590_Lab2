
var URL = 'https://newsapi.org/v2/everything?' +
          'language=en&' +
          'from=2018-01-01&' +
          'sortBy=relevancy&' +
          'apiKey=4e7410f126044cd0807b3f536176ea48&';

$(document).ready(function(){

    $('#news-sources').html(populate_news_outlets());

    $('#btn-search').on('click',function(){

        var topic = $('#inp-topic').val().trim();

        var selected = [];
        $.each($('input:checkbox:checked'),function(){
            selected.push($(this).val());
        });

        
        if(topic !== ""){
            URL += ('q=' + topic);
        }

        if(selected.length != 0){
            if(topic !== ""){
                URL += "&";
            }
            URL += ('sources=' + get_source_str(selected));
        }    
        console.log(Math.floor(20/3));
        get_articles(URL);
    });

    $('#btn-reset').on('click', function(){
        $('#inp-topic').val('');

        $.each($('input:checkbox:checked'),function(){
            $(this).attr('checked',false);
        });  
    });
});

function get_articles(theURL){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url:  theURL,
    }).done(function(data) {
        if(data['totalResults'] == 0){
            console.log('no results found');
        }
        console.log(data);
    }).fail(function(data) {
      console.log(data);
    });
}

function populate_news_outlets(){
    var html = '';
    var outlets = get_news_outlets();
    for(var i = 0; i < outlets.length; i++){
        html += '<div class=\'news-outlet-container\'>' + 
                    '<div class=\'news-img-container\'>' + 
                        '<img class=\'news-img-container\' src =\'img/' + outlets[i].img + '\'>' +
                    '</div>' +
                    '<div class=\'inp-sources\'>' +
                        '<label class=\'checkbox-inline\'><input type=\'checkbox\' value=\'' + outlets[i].id  +'\'>' + outlets[i].name + '</label>' +
                    '</div>' + 
                '</div>';
    }
    return html;
}

function get_source_str(sourceList){
    var sourceStr = '';
    for(var i = 0; i < sourceList.length; i++){
        sourceStr += sourceList[i];
        if(i < sourceList.length - 1){
            sourceStr += ',';
        }
    }
    return sourceStr;
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

