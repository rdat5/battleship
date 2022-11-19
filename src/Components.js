function containsArray(arr1, arr2) {
    return arr1[0] == arr2[0] && arr1[1] == arr2[1];
 }

function drawGrid(player) {
    let board = player.gameBoard.board;
    const gridContainer = document.createElement('div');
    gridContainer.style.height = '100%';
    gridContainer.style.width = '100%';
    gridContainer.style.display = 'grid'
    gridContainer.style.gridTemplateRows = 'repeat(10, 1fr)';
    gridContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement('button');
            let cellData = board[i][j];
            if (cellData === null) {
            }
            else {
                cell.style.backgroundColor = 'grey';
            }
            if (player.gameBoard.receivedShots.some(r => containsArray(r, [j, i]))) {
                cell.textContent = 'X';
            }
            gridContainer.appendChild(cell);
        }
    }

    return gridContainer;
}

export default drawGrid;