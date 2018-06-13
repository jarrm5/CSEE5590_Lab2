<?php
    // Start the session
    session_start();

    if(isset($_POST['Return'])){
        header('Location: login.php');
    }

    $error = "";
    
    if(isset($_POST['reg-username']) && isset($_POST['reg-password']) && isset($_POST['reg-password-again'])){
        if($_POST['reg-username'] != "" && $_POST['reg-password'] != "" && $_POST['reg-password-again'] != ""){
            if($_POST['reg-password'] != $_POST['reg-password-again']){
                $error = "2";
            }
            else{
                $error = "3";
                $_SESSION['users'] += [$_POST['reg-username'] => $_POST['reg-password']];
            }
        }
        else{
            $error = "1";
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>News App - Register</title>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">

    <style>

        .title{
            text-align:center;
            width:60%;
            background-color: bisque;
            margin:auto;
            padding: 15px 0;
            font-size:3em;
            font-weight:bold;
            font-family: 'Playfair Display', serif;
        }
        
        #form{
            background-color: bisque;
            width: 60%;
            margin:auto;
            text-align:center;
            display:flex;
            flex-direction:row;
            justify-content:center;
        }

        #form label{
            margin: 18px 0 0 0;
            text-align:right;
            font-weight:bold;
        }

        #form input{
            margin: 15px 0 0 10px;
        }

        .left, .right{
            display:flex;
            flex-direction:column;
        }
        
        .buttons{
            text-align:center;
        }

        .buttons input{
            width: 120px;
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

        .success{
            color:green;
            text-align:center;
            font-weight:bold;
        }

    </style>


</head>
    <body>
        <div class="container">
            <div class="title">
                Registration
            </div>
            <form id='form' action='register.php' method='post' accept-charset='UTF-8'>
                <div class="left">
                    <label for='username' >UserName*</label>
                    <label for='password' >Password*</label>
                    <label for='password-again' >Retype Password*</label>       
                </div>
                <div class="right">
                    <input type='text' name='reg-username' id='username' maxlength="10" />
                    <input type='password' name='reg-password' id='password' maxlength="10" />
                    <input type='password' name='reg-password-again' id='password-again' maxlength="10" />
                </div>
                <div class="buttons">
                    <input class='btn btn-sm' type='submit' name='Submit' value='Register' />
                    <input class='btn btn-sm' type='submit' name='Return' value='Return to Login' />  
                </div>
            </form>
        </div>
        <?php
        $result = "";
        switch($error){
            case "1":
                $result = "<div class='error'>All fields must be filled</div>";
                break;
            case "2":
                $result = "<div class='error'>Passwords must match</div>";
                break;
            case "3":
                $result = "<div class='success'>Registration succesful. You may log in with your new account.</div>";
                break;  
            default:
                break;
        }
        echo $result;
        ?>
    </body>
</html>


