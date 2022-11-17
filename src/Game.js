import Player from "./Player.js";

class Game {
    constructor() {
        this.p1 = new Player(false);
        this.p2 = new Player(true);
        this.p1.addOpponentBoard(this.p2);
        this.p2.addOpponentBoard(this.p1);
        this.gameSetup();
    }

    gameSetup() {
        
    }
}

export default Game;