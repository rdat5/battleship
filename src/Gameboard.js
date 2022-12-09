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
        ships: [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Destroyer'), Ship(3, 'Submarine'), Ship(2, 'Patrol Boat')],
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
        isValidPlacement(shipIndex, x, y, isVertical) {
            let isValid = true;
            let shiplength = this.ships[shipIndex].length;

            if (isVertical)
            {
                for (let i = 0; i < this.ships[shipIndex].length; i++) {
                    // check if cells are empty
                    if (this.getCell(x, y + i).contents) {
                        isValid = false;
                    }
                }
                // check if out of bounds
                if (y + shiplength > size - 1) {
                    isValid = false;
                }
            }
            else {
                for (let i = 0; i < this.ships[shipIndex].length; i++) {
                    // check if cells are empty
                    if(this.getCell(x + i, y).contents) {
                        isValid = false;
                    }
                }
                // check if out of bounds
                if (x + shiplength > size - 1) {
                    isValid = false;
                }
            }

            return isValid;
        },
        recieveAttack(x, y) {
            if (this.getCell(x, y).contents) {
                this.getCell(x, y).contents.hit();
            }
            this.getCell(x, y).isStruck = true;
        },
        areAllShipsSunk() {
            return this.ships.every(ship => ship.isSunk());
        },
        printBoard() {
            let finalString = "";
            for (let i = 0; i < this.board.length; i++) {
                let row = ""
                for (let j = 0; j < this.board.length; j++) {
                    if (this.getCell(j, i).contents == null) {
                        if (this.getCell(j, i).isStruck) {
                            row += '[X]';
                        }
                        else {
                            row += '[ ]';
                        }
                    }
                    else {
                        if (this.getCell(j, i).isStruck) {
                            row += '[ⓧ]';
                        }
                        else {
                            row += '[O]';
                        }
                    }
                }
                finalString += `${row}\n`;
            }
            return finalString;
        }
    }
}

export default Gameboard;