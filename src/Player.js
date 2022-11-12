import Gameboard from "./Gameboard.js";

class Player {
    constructor(isComputer = false) {
        this.isComputer = isComputer;
        this.gameBoard = Gameboard(10);
        this.opponentBoard = null;
        this.shotsMade = [];
        this.possibleShots = this.getAllPossibleShots();
    }

    addOpponentBoard(opponent) {
        this.opponentBoard = opponent.gameBoard;
    }

    attackTarget(x = null, y = null) {
        let shotCoordinate;
        if (this.isComputer) {
            shotCoordinate = this.getRandomTarget();
            this.opponentBoard.receiveAttack(shotCoordinate[0], shotCoordinate[1]);    
        }
        else {
            shotCoordinate = [x, y];
            this.opponentBoard.receiveAttack(x, y);
        }
        this.shotsMade.push(shotCoordinate);
    }

    getAllPossibleShots() {
        let shots = [];
        for (let i = 0; i < this.gameBoard.board.length; i++) {
            for (let j = 0; j < this.gameBoard.board.length; j++) {
                shots.push([i, j]);
            };
        }
        return shots;
    }

    getRandomTarget() {
        let randomShotIndex = Math.floor(Math.random() * this.possibleShots.length);
        let randomTarget = this.possibleShots[randomShotIndex];
        this.possibleShots.splice(randomShotIndex, 1);
        return randomTarget;
    }
};

export default Player;