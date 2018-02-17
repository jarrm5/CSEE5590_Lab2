'use strict';

var tictactoeApp = angular.module('tictactoeApp', []);

tictactoeApp.controller('controller', function controller($scope, game) {
    $scope.game = game;
});

tictactoeApp.factory('game', function () {
    return new Game();
});

function Game(){

    this.TITLE = "TicTacToe Game";
    this.MESSAGE = Game.YOUR_TURN;
    this.board = makeBoard();
    this.gameOver = false;

    this.makePlayerMove = function(row,col){

        if(!this.gameOver){
            if(!this.board[row][col].isOccupied){
                this.board[row][col].token = Game.PLAYER_TOKEN;
                this.board[row][col].isOccupied = true;
                
                var result = isGameOver(this.board);
    
                if(result === Game.PLAYER_TOKEN){
                    this.MESSAGE = Game.YOU_WIN;
                    this.gameOver = true;
                    return;
                }
                else if(result == null){
                    this.MESSAGE = Game.YOU_TIE;
                    this.gameOver = true;
                    return;
                }
                
                /*
                MinMax algorithm not working - stack can't accomodate recursive calls
                var opponentMove = smartOppenentMove(this.board);
                this.board[opponentMove[i]][opponentMove[j]] = Game.COMPUTER_TOKEN;
                */

                dumbOpponentMove(this.board);
                //debugger;
                
                result = isGameOver(this.board);
    
                if(result === Game.COMPUTER_TOKEN){
                    this.MESSAGE = Game.YOU_LOSE;
                    this.gameOver = true;
                    return;
                }
                else if(result == null){
                    this.MESSAGE = Game.YOU_TIE;
                    this.gameOver = true;
                    return;
                }
                else{
                    this.MESSAGE = Game.YOUR_TURN;
                }
                    
            }
            else{
                //Can't fill a square that is already occupied; try again
                this.MESSAGE = Game.YOUR_ERROR;
            }
        }
        
        return;
    }
}

function Square(){
    this.token = "";
    this.isOccupied = false;
}


function makeBoard(){
    var board = [];
    for(var i = 0; i < 3;i++){
        board.push([]);
        for(var j = 0; j < 3;j++)
            board[i].push(new Square());
    }
    return board;
}

function isGameOver(board){

    for(var i = 0; i < board.length; i++){
        var player = board[i][0].token;
        if(board[i][0].token === player && board[i][1].token === player && board[i][2].token === player && player !== ""){
            //Someone won horizontally, return their token
            return player;
        }
    }

    for(var i = 0; i < board.length; i++){
        var player = board[0][i].token;
        if(board[0][i].token === player && board[1][i].token === player && board[2][i].token === player && player !== ""){
            //Someone won vertically, return their token
            return player;
        }
    }

    var player = board[0][0].token;
    if(board[0][0].token === player && board[1][1].token === player && board[2][2].token === player && player !== ""){
        //Someone won diagonally, return their token
        return player;
    }

    player = board[0][2].token;
    if(board[0][2].token === player && board[1][1].token === player && board[2][0].token === player && player !== ""){
        //Someone won diagonally, return their token
        return player;
    }

    //Game is still live
    for(var i = 0; i < board.length; i++){
        for(var j = 0;j < board.length;j++){
            if(!board[i][j].isOccupied){
                return false;
            }
        }
    }

    //tie game
    return null;
}
//Dumb opponent that fills horizontally
function dumbOpponentMove(board){
    //loop through each row looking for a spot to fill
    //if the recursion returns true then the computer player made his move.
    for(var i = 0; i < board.length; i++){
        var result = fillHorizontal(board, i, 0);
        if(result){
            break;
        }
    }
    
}

//recursive function for the computer player to fill a spot on the board.
function fillHorizontal(board,row,col){
    //Out of bounds case
    if(board[row][col] == null){
        return false;
    }
    //Square already occupied case
    if(board[row][col].isOccupied){
        return fillHorizontal(board,row, col+1);
    }
    //Fill the Square
    else{
        board[row][col].token = Game.COMPUTER_TOKEN;
        board[row][col].isOccupied = true;
        return true;
    }
}

//unbeatable opponent using minmax algorithm *not working atm*
function smartOppenentMove(board){

    return minMax(board, 0, Game.COMPUTER_TOKEN)

}

function minMax(newGrid,depth,token){
        
    var result = isGameOver(newGrid);

    //No one has won yet
    if(result === false){
        //store the child nodes of the tree formed when computing depth of the outcomes
        var children = [];

        //Loop through all the potential moves the computer player could make
        for(var i = 0; i < newGrid.length; i++){
            for(var j = 0;j < newGrid.length;j++){
                //need a copy of the grid each time we want to make a move
                var gridCopy = _.cloneDeep(newGrid);
                //Skip over the occupied spots
                if(gridCopy[i][j].isOccupied){
                    continue;
                }
                gridCopy[i][j] = token;
                //recursive call to minMax to traverse to the next depth 
                var child = minMax(gridCopy,depth + 1, (token === Game.PLAYER_TOKEN) ? Game.COMPUTER_TOKEN : Game.PLAYER_TOKEN );
                children.push({
                    cost: child,
                    cell: {
                        i:i,
                        j:j
                    }
                });
                
            }
        }

        if(token === Game.COMPUTER_TOKEN){
            var max = _.maxBy(children, (c) => {
                return c.cost;
            });
            if(depth === 0){
                return max.cell;
            }
            else{
                return max.cost;
            }
        }
        else{
            var min = _.minBy(children, (c) => {
                return c.cost;
            });
            if(depth === 0){
                return min.cell;
            }
            else{
                return min.cost;
            }
        }
    }
    //there is a tie
    else if(result === null){
        return 0;
    }
    else if(result === Game.PLAYER_TOKEN){
        return depth - 10;
    }
    else if(result === Game.COMPUTER_TOKEN){
        return 10 - depth;
    }
}

Game.PLAYER_TOKEN = 'O';
Game.COMPUTER_TOKEN = 'X';
Game.YOUR_TURN = "Pick an Empty Square.";
Game.YOUR_ERROR = "This Square is already occupied. Try again.";
Game.YOU_WIN = "You Win!"
Game.YOU_TIE = "You Tied."
Game.YOU_LOSE = "You Lost.."
