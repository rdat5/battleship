import Gameboard from "./Gameboard.js";

class Player {
    constructor(isCPU = false) {
        this.isCPU = isCPU;
        this.gameboard = Gameboard(10);
        this.opponentBoard = null;
    }
    
    setOpponentBoard(opponent) {
        this.opponentBoard = opponent.gameboard;
    }

    getPossibleTargets() {
        let board = this.opponentBoard.board;
        let newTargets = [];

        board.forEach(row => {
            row.forEach(cell => {
                if (!cell.isStruck){
                    newTargets.push(
                        {
                            x: cell.x,
                            y: cell.y
                        }
                    )
                }
            })
        });

        return newTargets;
    }
}

export default Player;