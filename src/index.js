import Game from "./Game.js";

const p1BoardElem = document.querySelector('.p1Board');
const p2BoardElem = document.querySelector('.p2Board');

const game = new Game();

function onCellClick() {
    console.log('you clicked!');
}

function renderBoardGrid(gboard, clickFn) {
    const gridContainer = document.createElement('div');
    let boardData = gboard.board;

    for (let row = 0; row < boardData.length; row++) {
        for (let col = 0; col < boardData[row].length; col++) {
            let cellData = gboard.getCell(col, row);
            const cellElem = document.createElement('button');

            cellElem.style.height = '100%';
            cellElem.style.borderWidth = '1px';
            if (cellData.contents) {
                cellElem.style.backgroundColor = 'grey';
                if (cellData.isStruck) {
                    cellElem.style.backgroundColor = 'black';
                    cellElem.textContent = '💥';
                }
                else {
                    cellElem.addEventListener('click', clickFn)
                }
            }
            else {
                cellElem.style.backgroundColor = 'lightsteelblue';
                if (cellData.isStruck) {
                    cellElem.style.backgroundColor = 'darkcyan';
                    cellElem.textContent = '❌';
                }
                else {
                    cellElem.addEventListener('click', clickFn)
                }
            }

            // Cell click function
            // cellElem.addEventListener('click', clickFn)

            gridContainer.appendChild(cellElem);

        }
    }

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateRows = `repeat(${gboard.board.length}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${gboard.board[0].length}, 1fr)`;
    gridContainer.style.width = '100%';
    gridContainer.style.height = '100%';

    return gridContainer;
};

// Predetermined coordinates before implementing player created ones
game.p1Gameboard.placeShip(0, 3, 5);
game.p1Gameboard.placeShip(1, 2, 1);
game.p1Gameboard.placeShip(2, 1, 6, true);
game.p1Gameboard.placeShip(3, 8, 1, true);
game.p1Gameboard.placeShip(4, 5, 7, true);

game.p2Gameboard.placeShip(0, 0, 8);
game.p2Gameboard.placeShip(1, 3, 3, true);
game.p2Gameboard.placeShip(2, 8, 0, true);
game.p2Gameboard.placeShip(3, 7, 7, false);
game.p2Gameboard.placeShip(4, 0, 0, true);

p1BoardElem.appendChild(renderBoardGrid(game.p1Gameboard, onCellClick));
p2BoardElem.appendChild(renderBoardGrid(game.p2Gameboard, onCellClick));

// console.log(game.p1Gameboard.board[0][2]);