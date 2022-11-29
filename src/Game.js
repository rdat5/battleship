import Player from "./Player.js";
import Gameboard from "./Gameboard.js";


class Game {
    constructor() {
        this.p1 = new Player();
        this.p2 = new Player(true);
        this.p1Gameboard = Gameboard(10);
        this.p2Gameboard = Gameboard(10);
    }
};

export default Game;