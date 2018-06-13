<!DOCTYPE HTML>

<?php

    // Start the session
    session_start();

    //Check if list of users have been initialized
    if(!isset($_SESSION['users'])){
        $users = array("user1"=>"password1", "user2"=>"password2","user3"=>"password3");
        $_SESSION['users'] = $users;
    }

    //Register button, hit, go to register page
    if(isset($_POST['register'])){
        header('Location: register.php');
    }

    // Error message
    $error = "";

    // Checks to see if the user is already logged in. If so, redirect to correct page.
    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) {
        $error = "success";
        header('Location: home.php');
    }
        
    // Checks to see if the username and password have been entered.
    // If so and are equal to the username and password defined above, log them in.
    if (isset($_POST['username']) && isset($_POST['password'])) {

        foreach($_SESSION['users'] as $u => $u_value){
            if ($_POST['username'] == $u && $_POST['password'] == $u_value) {
                $_SESSION['loggedIn'] = true;
                header('Location: home.php');
        }
        $error="fail";
        $_SESSION['loggedIn'] = false;  
    }
}
?>

<html>
    <head>
        <title>News App - Login</title>
    </head>
    

    <style>

        .title{
            text-align:center;
            width:50%;
            background-color: bisque;
            margin:auto;
            padding: 15px 0;
            font-size:3em;
            font-weight:bold;
            font-family: 'Playfair Display', serif;
        }
    
        #form{
            background-color: bisque;
            width: 50%;
            margin:auto;
            text-align:center;
            display:flex;
            flex-direction:row;
            justify-content:center;
        }

        #form label{
            margin: 3px 0 0 0;
        }

        #form input{
            margin: 0 0 0 15px;
        }

        .left, .right{
            display:flex;
            flex-direction:column;
        }

        .buttons{      
            text-align:center;
        }

        
        .buttons input{
            width: 75px;
            font-weight:bold;
        }

        .buttons input:hover{
            background-color: #F0C508;
        }

        .error{
            color:red;
            text-align:center;
            font-weight:bold;
        }
    
    </style>

    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">

    <body>
        
        <div class="container">
            <div class="title">
                News App
            </div>
            <form id='form' method='POST' action='login.php'>
                <div class="left">
                    <label for="username">Username:</label><br/>
                    <label for="password">Password:</label><br/>
                    
                </div>
                <div class="right">
                    <input type="text" name="username" id="username"><br/>
                    <input type="password" name="password" id="password"><br/>
                    
                </div>
                <div class="buttons">
                    <input class='btn btn-sm' name='login' type="submit" value="Log In"> 
                    <input class='btn btn-sm' name='register' type="submit" value="Register">
                </div>
            </form>
            
        </div>
        
        <?php
        
        if($error == "fail"){
            echo "<div class='error'>Incorrect username or password</div>";
        }

    ?>

    </body>
</html>