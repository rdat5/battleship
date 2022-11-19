const Gameboard = (boardSize = 10) => {
    function createBoard(size) {
        let newBoard = []
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(null);
            }
            newBoard.push(row);
        }
        return newBoard;
    }
    
    return {
        board: createBoard(boardSize),
        missedShots: [],
        receivedShots: [],
        placedShips: [],
        placeShip(x, y, ship, isVertical) {
            if (isVertical){
                for (let i = 0; i < ship.length; i++) {
                    this.board[y + i][x] = ship;
                }
            }
            else {
                for (let i = 0; i < ship.length; i++) {
                    this.board[y][x + i] = ship;
                }
            }
            this.placedShips.push(ship);
        },
        receiveAttack(x, y) {
            if (this.board[y][x]) {
                this.board[y][x].hit();
            }
            else {
                this.missedShots.push([x, y]);
            }
            this.receivedShots.push([x, y]);
        },
        areShipsAllSunk() {
            return this.placedShips.every((s) => {
                return s.isSunk();
            })
        }
    }
};

export default Gameboard;