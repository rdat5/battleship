class Player {
    constructor(isCPU = false) {
        this.isCPU = isCPU;
    }

    getPossibleTargets(gboard) {
        let board = gboard.board;
        let newTargets = [];

        board.forEach(row => {
            row.forEach(cell => {
                if (!cell.isStruck){
                    newTargets.push(
                        {
                            x: cell.x,
                            y: cell.y
                        }
                    )
                }
            })
        });

        return newTargets;
    }

    getRandomTarget(gboard) {

    }
}

export default Player;