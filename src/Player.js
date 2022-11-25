import Gameboard from "./Gameboard.js";

class Player {
    constructor(isCPU = false) {
        this.isCPU = isCPU;
        this.gameboard = Gameboard(10);
    }
}