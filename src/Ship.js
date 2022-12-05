const Ship = (length, shipName = '') => {
    return {
        length: length,
        timesHit: 0,
        shipName: shipName,
        hit() {
            this.timesHit += 1;
        },
        isSunk() {
            return this.timesHit == this.length;
        }
    }
}

export default Ship;