import Game from "./Game.js";

const p1BoardElem = document.querySelector('.p1Board');
const p2BoardElem = document.querySelector('.p2Board');

const game = new Game();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function onCellClick(boardNum, gboard, cellD) {
    if (boardNum == 1) {
        // update data
        game.p1Gameboard.recieveAttack(cellD.x, cellD.y);
        // render
        removeAllChildNodes(p1BoardElem);
        p1BoardElem.appendChild(renderBoardGrid(1, game.p1Gameboard, onCellClick));
    }
    else if (boardNum == 2) {
        // update data
        game.p2Gameboard.recieveAttack(cellD.x, cellD.y);
        // render
        removeAllChildNodes(p2BoardElem);
        p2BoardElem.appendChild(renderBoardGrid(2, game.p2Gameboard, onCellClick));
    }
    console.log(`clicked cell: ${cellD.x}, ${cellD.y}`);
}

function renderBoardGrid(boardNum, gboard, clickFn) {
    const gridContainer = document.createElement('div');
    let boardData = gboard.board;

    for (let row = 0; row < boardData.length; row++) {
        for (let col = 0; col < boardData[row].length; col++) {
            let cellData = gboard.getCell(col, row);
            let cellBGColor = '';
            const cellElem = document.createElement('button');

            cellElem.style.height = '100%';
            cellElem.style.borderWidth = '1px';

            // Add click event listener if not struck already
            cellBGColor = 'lightsteelblue';
            if (!cellData.isStruck && boardNum == 2) {
                cellElem.addEventListener('click', () => {
                    clickFn(boardNum, gboard, cellData);
                });
            }
            
            // Color ships
            if (cellData.contents) {
                if (cellData.isStruck) {
                    cellBGColor = 'black';
                    cellElem.textContent = '💥';
                    cellElem.style.fontSize = '1.5em';
                }
                else {
                    cellBGColor = 'grey';
                }
            }
            else {
                // Color water
                if (cellData.isStruck) {
                    cellBGColor = 'darkcyan';
                    cellElem.textContent = '❌';
                }
            }

            if (boardNum == 2 && !cellData.isStruck) {
                cellBGColor = 'darkgrey';
            }

            cellElem.style.backgroundColor = cellBGColor;
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

p1BoardElem.appendChild(renderBoardGrid(1, game.p1Gameboard, onCellClick));
p2BoardElem.appendChild(renderBoardGrid(2, game.p2Gameboard, onCellClick, true));

// console.log(game.p1Gameboard.board[0][2]);