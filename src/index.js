import Game from "./Game.js";

const p1BoardElem = document.querySelector('.p1Board');
const p2BoardElem = document.querySelector('.p2Board');
const p1ShipsSunkList = document.querySelector('.p1ShipsSunk');
const p2ShipsSunkList = document.querySelector('.p2ShipsSunk');
const p1Name = document.querySelector('.p1Name');
const p2Name = document.querySelector('.p2Name');

const game = new Game();

let shipsSuccessfullyPlaced = 0;

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function gameOverSetup() {
    let p1LostState = game.p1Gameboard.areAllShipsSunk();
    let p2LostState = game.p2Gameboard.areAllShipsSunk();

    if (p1LostState && !p2LostState) {
        // if p1 ships are all sunk, but not p2
        p1Name.textContent += ' LOSES';
        p2Name.textContent += ' WINS';
        alert('Game over! Player 2 Wins!');
    }
    else if (p2LostState && !p1LostState) {
        // if p2 ships are all sunk, but not p1
        p1Name.textContent += ' WINS';
        p2Name.textContent += ' LOSES';
        alert('Game over! Player 1 Wins!');
    } else {
        // draw
        p1Name.textContent += ' DRAWS';
        p2Name.textContent += ' DRAWS';
        alert('Game over! Draw!');
    }
}

function onCellClick(cellD) {
    if (!game.gameIsOver) {
        // update data
        game.p2Gameboard.recieveAttack(cellD.x, cellD.y);
        // render
        removeAllChildNodes(p2BoardElem);
        p2BoardElem.appendChild(renderBoardGrid(2, game.p2Gameboard, onCellClick));
        
        // Player 2 attack and render result
        let cpuAttack = game.p2.pickRandomTarget(game.p1Gameboard);
        game.p1Gameboard.recieveAttack(cpuAttack.x, cpuAttack.y);
        // render
        removeAllChildNodes(p1BoardElem);
        p1BoardElem.appendChild(renderBoardGrid(1, game.p1Gameboard, onCellClick));
    
        updateShipSunkList();
        console.log(`clicked cell: ${cellD.x}, ${cellD.y}`);
    
        // Check if game is over
        if (game.p1Gameboard.areAllShipsSunk() || game.p2Gameboard.areAllShipsSunk()) {
            game.gameIsOver = true;
            gameOverSetup();
        }
    }
}

function updateShipSunkList() {
    p1ShipsSunkList.textContent = '';
    p2ShipsSunkList.textContent = '';
    game.p1Gameboard.ships.forEach(ship => {
        if (ship.isSunk()) {
            p1ShipsSunkList.textContent += `🛳️${ship.shipName}(${ship.length})`;
        }
    })
    game.p2Gameboard.ships.forEach(ship => {
        if (ship.isSunk()) {
            p2ShipsSunkList.textContent += `🛳️${ship.shipName}(${ship.length})`;
        }
    })
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
                    clickFn(cellData);
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

function renderShipPlacementGrid() {
    removeAllChildNodes(p1BoardElem);
    const gridContainer = document.createElement('div');
    let boardData = game.p1Gameboard.board;

    if (shipsSuccessfullyPlaced < game.p1Gameboard.ships.length) {

        for (let row = 0; row < boardData.length; row++) {
            for (let col = 0; col < boardData[row].length; col++) {
                let cellData = game.p1Gameboard.getCell(col, row);
                let cellBGColor = '';
                const cellElem = document.createElement('button');
    
                cellElem.style.height = '100%';
                cellElem.style.borderWidth = '1px';
                
                // Color ships
                if (cellData.contents) {
                    cellBGColor = 'black';
                }
                else {
                    // add click
                    cellElem.addEventListener('click', () => {
                        if (shipsSuccessfullyPlaced < game.p1Gameboard.ships.length) {
                            let shipVertConfirm = confirm(`Place ${game.p1Gameboard.ships[shipsSuccessfullyPlaced].shipName} vertically? \n OK = Vertical, Cancel = Horizontal`);
                            if (game.p1Gameboard.isValidPlacement(shipsSuccessfullyPlaced, cellData.x, cellData.y, shipVertConfirm)) {
                                game.p1Gameboard.placeShip(shipsSuccessfullyPlaced, cellData.x, cellData.y, shipVertConfirm);
                                shipsSuccessfullyPlaced += 1;
                            }
                            else {
                                alert('Invalid placement! Try again');
                            }
                            renderShipPlacementGrid();
                        }
                    })
                }
    
                cellElem.style.backgroundColor = cellBGColor;
                gridContainer.appendChild(cellElem);
    
            }
        }
    
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateRows = `repeat(${game.p1Gameboard.board.length}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${game.p1Gameboard.board[0].length}, 1fr)`;
        gridContainer.style.width = '100%';
        gridContainer.style.height = '100%';
    
        p1BoardElem.appendChild(gridContainer);

        alert(`Placing ${game.p1Gameboard.ships[shipsSuccessfullyPlaced].shipName} (${game.p1Gameboard.ships[shipsSuccessfullyPlaced].length} unit)`);
    }
    else {
        alert("Ships placed! Game start!");
        game.p2Gameboard.randomlyPlaceShips();
        p1BoardElem.appendChild(renderBoardGrid(1, game.p1Gameboard, onCellClick));
        p2BoardElem.appendChild(renderBoardGrid(2, game.p2Gameboard, onCellClick, true));
        updateShipSunkList();
    }
}

// CPU placement
// game.p2Gameboard.placeShip(0, 0, 8);
// game.p2Gameboard.placeShip(1, 3, 3, true);
// game.p2Gameboard.placeShip(2, 8, 0, true);
// game.p2Gameboard.placeShip(3, 7, 7, false);
// game.p2Gameboard.placeShip(4, 0, 0, true);

// Start game
renderShipPlacementGrid();
// game.p2Gameboard.randomlyPlaceShips();
// p2BoardElem.appendChild(renderBoardGrid(2, game.p2Gameboard, onCellClick, true));
// updateShipSunkList();
