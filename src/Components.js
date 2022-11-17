function drawGrid(board) {
    const gridContainer = document.createElement('div');
    gridContainer.style.height = '100%';
    gridContainer.style.width = '100%';
    gridContainer.style.display = 'grid'
    gridContainer.style.gridTemplateRows = 'repeat(10, 1fr)';
    gridContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement('button');
            gridContainer.appendChild(cell);
        }
    }

    return gridContainer;
}

export default drawGrid;