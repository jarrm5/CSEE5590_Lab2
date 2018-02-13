<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BBC News App</title>

    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src='../js/home.js'></script>

    <style>

        .title{
            text-align:center;
            background-color: bisque;
            margin:25px 50px;
            padding: 15px 0;
            font-size:3em;
            font-weight:bold;
            font-family: 'Playfair Display', serif;
        }

        #search-bar,#news-sources,#buttons{
            margin: 25px 50px;
        }

        #search-bar{
            text-align:center;
            
        }

        #inp-topic{
            font-weight:italic;
            width:75%;
            font-family: 'Playfair Display', serif;
        }

        #news-sources{
            display: flex;
            flex-wrap:wrap;
        }

        .news-outlet-container{
            margin: 10px;
            width: 200px;
            text-align:center;
        }

        .news-img-container img{
            height: 50px;
            width: 50px;
        }

        .news-article{
            height: 125px;
            display: flex;
            justify-content: flex-start;
            margin: 10px;
            background-color: bisque;
            border-radius: 5px;
            overflow: none;
        }

        .news-article-content{
            font-family: 'Playfair Display', serif;
            margin: 0px 0px 0px 15px;
        }

        .news-article-content span{
            font-size: .7em;
        }

        .news-article-content h2{
            font-weight:bold;
        }

        .news-article-content h2, .news-article-content p{
            margin: 0px;
        }

        .news-article-content h2{
            margin-top:10px;
        }

        .news-article-content p{
            margin-top: 20px;
        }

        .news-article-img a img{
            width:125px;
            height:100%;
            
        }

        .checkbox-inline{
            font-family: 'Playfair Display', serif;
        }

        #buttons{
            text-align:center;
        }

        #buttons input{
            width: 120px;
            font-weight:bold;
        }

        #buttons input:hover{
            background-color: #F0C508;
        }
    
    
    </style>

</head>
<body>
    <div class="container">
        <div class="title">
            BBC News App
        </div>
        <div id="search-bar">
            <input placeholder='Search a news topic..' type="text" id="inp-topic">
        </div>
        <div id="news-sources">
                
        </div>
        <div id="buttons">
            <input id="btn-search" class='btn btn-sm' type='submit' name='search' value='Search' />
            <input id="btn-reset" class='btn btn-sm' type='submit' name='reset' value='Reset' />
            <!--<button class='btn btn-sm' id="btn-search">Search</button>
            <button class='btn btn-sm' id="btn-reset">Reset</button>-->
        </div>
        <div id="news-articles-container">
            
        </div>
    </div>
</body>
</html>

