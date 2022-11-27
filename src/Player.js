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

    pickRandomTarget(gboard) {
        let possibleTargets = this.getPossibleTargets(gboard);

        return possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
    }
}

export default Player;