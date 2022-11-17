import drawGrid from "./Components.js";
import Game from "./Game.js";
import Ship from "./Ship.js";

const game = new Game();

const p1Board = document.querySelector('.p1Board');
const p2Board = document.querySelector('.p2Board');

game.p2.gameBoard.placeShip(4, 2, Ship(5), true);

p1Board.appendChild(drawGrid(game.p1.gameBoard.board));
p2Board.appendChild(drawGrid(game.p2.gameBoard.board));