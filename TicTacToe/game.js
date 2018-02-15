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
    this.DIMENSION = 3;
    this.board = makeBoard(this.DIMENSION);
    this.inProgress = true;

    this.makePlayerMove = function(row,col,char){

        if(this.inProgress){
            if(!this.board[row][col].isOccupied){
                this.board[row][col].char = char;
                this.board[row][col].isOccupied = true;
                if(checkWinner(char,this.board)){
                    this.inProgress = false;
                    this.MESSAGE = Game.YOU_WIN;
                }
                else{
                    //makeOppenentMove();
                    this.MESSAGE = Game.YOUR_TURN;
                }
                
                
            }
            else{
                this.MESSAGE = Game.YOUR_ERROR;
            }
        }
        
        
        
        //debugger;
        
        return;
    }
}

function Square(){
    this.char = "";
    this.isOccupied = false;
}


function makeBoard(size){
    var board = [];
    for(var i = 0; i < size;i++){
        board.push([]);
        for(var j = 0; j < size;j++)
            board[i].push(new Square());
    }
    return board;
}

function checkWinner(player,board){
    
    
    var test = getDiagonals(board);
    debugger;
    return evalBoard(board) || evalBoard(getColumns(board)) || evalBoard(getDiagonals(board));

    function evalBoard(a){
        for(var i = 0; i < a.length; i++){
            if(a[i].every(everyFunction)){
                return true;
            }
        }
        return false;
    }
    function getColumns(board){
        var columnsArray = [];
        for(var i=0; i < board.length; i++){
            var col = [];
            for(var j = 0; j < board.length; j++){
                col.push(board[j][i]);
            }
            columnsArray.push(col);
        }
        var test = columnsArray;
        return columnsArray;
    }
    function getDiagonals(board){
        var diagonalsArray = [];
        var diag = [];
        for(var i = 0; i < board.length; i++){
            diag.push(board[i][i]);
        }
        diagonalsArray.push(diag);
        diag = [];
        for(var i = board.length-1; i >= 0; i--){
            diag.push(board[i][(board.length-1) - i]);
        }
        diagonalsArray.push(diag);
        return diagonalsArray;
    }

    function everyFunction(p){
        return player === p.char;
    }
}





function makeOppenentMove(){

}

Game.YOUR_TURN = "Pick an Empty Square.";
Game.YOUR_ERROR = "This Square is already occupied. Try again.";
Game.YOU_WIN = "You Win!"
Game.YOU_TIE = "You Tied."
Game.YOU_LOSE = "You Lost.."
