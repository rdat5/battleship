import drawGrid from "./Components.js";
import Game from "./Game.js";
import Ship from "./Ship.js";

const game = new Game();

const p1Board = document.querySelector('.p1Board');
const p2Board = document.querySelector('.p2Board');

// Player 1 ships placement
game.p1.gameBoard.placeShip(1, 1, Ship(5), false);
game.p1.gameBoard.placeShip(7, 5, Ship(4), true);
game.p1.gameBoard.placeShip(2, 6, Ship(3), true);
game.p1.gameBoard.placeShip(3, 4, Ship(3), false);
game.p1.gameBoard.placeShip(8, 1, Ship(2), true);
// Player 2 ships placement
game.p2.gameBoard.placeShip(4, 2, Ship(5), true);
game.p2.gameBoard.placeShip(8, 1, Ship(4), true);
game.p2.gameBoard.placeShip(1, 8, Ship(3), false);
game.p2.gameBoard.placeShip(6, 7, Ship(3), false);
game.p2.gameBoard.placeShip(0, 1, Ship(2), false);

// Attack
game.p1.attackTarget(3, 1);
game.p1.attackTarget(4, 1);
game.p1.attackTarget(9, 9);
game.p2.attackTarget();
game.p2.attackTarget();
game.p2.attackTarget();

p1Board.appendChild(drawGrid(game.p1));
p2Board.appendChild(drawGrid(game.p2));