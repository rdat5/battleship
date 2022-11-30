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
            }
            else {
                cellElem.style.backgroundColor = 'lightsteelblue';
                if (cellData.isStruck) {
                    cellElem.style.backgroundColor = 'darkcyan';
                    cellElem.textContent = '❌';
                }
            }

            // Cell click function
            cellElem.addEventListener('click', clickFn)

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

game.p1Gameboard.placeShip(0, 3, 5);
game.p1Gameboard.recieveAttack(2, 3);
game.p1Gameboard.recieveAttack(5, 5);

p1BoardElem.appendChild(renderBoardGrid(game.p1Gameboard, onCellClick));

// console.log(game.p1Gameboard.board[0][2]);