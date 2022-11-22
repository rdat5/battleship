import Ship from "./Ship.js";

const Gameboard = (size) => {
    const Cell = (x, y) => {
        return {
            x: x,
            y: y,
            contents: null,
            isStruck: false
        };
    }

    const createGrid = (s) => {
        let newGrid = [];
        for (let row = 0; row < s; row++) {
            let newRow = [];
            for (let col = 0; col < s; col++) {
                newRow.push(Cell(col, row));
            }
            newGrid.push(newRow);
        }
        return newGrid;
    }



    return {
        board: createGrid(size),
        ships: [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)],
        getCell(x, y) {
            return this.board[y][x];
        },
        placeShip(shipIndex, x, y, isVertical) {
            if (isVertical)
            {
                for (let i = 0; i < this.ships[shipIndex].length; i++) {
                    this.getCell(x, y + i).contents = this.ships[shipIndex];
                }
            }
            else {
                for (let i = 0; i < this.ships[shipIndex].length; i++) {
                    this.getCell(x + i, y).contents = this.ships[shipIndex];
                }
            }
        },
        printBoard() {
            let finalString = "";
            for (let i = 0; i < this.board.length; i++) {
                let row = ""
                for (let j = 0; j < this.board.length; j++) {
                    if (this.getCell(j, i).contents == null) {
                        row += '[ ]';
                    }
                    else {
                        row += '[O]';
                    }
                }
                finalString += `${row}\n`;
            }
            return finalString;
        }
    }
}

export default Gameboard;