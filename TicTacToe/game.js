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

    this.makeMove = function(row,col,char){
        if(!this.board[row][col].isOccupied){
            this.board[row][col].char = char;
            this.board[row][col].isOccupied = true;
        }
        else{
            this.MESSAGE = Game.YOUR_ERROR;
        }
        debugger;
        return;
    }
}

function Square(){
    this.char = undefined;
    this.isOccupied = false;
}


function makeBoard(size){
    var board = [];
    for(var i = 0; i < size;i++){
        board.push([]);
        //var test = new Square();
        //test.char = 'X';
        //test.isOccupied = true;
        //board[i].push(test);
        //for(var j = 1; j < size;j++)
        for(var j = 0; j < size;j++)
            board[i].push(new Square());
    }
    return board;
}

Game.YOUR_TURN = "Pick an Empty Square.";
Game.YOUR_ERROR = "This Square is already occupied. Try again.";
Game.YOU_WIN = "You Win!"
Game.YOU_LOSE = "You Lost.."
