const Ship = (length) => {
    return {
        length: length,
        timesHit: 0,
        hit() {
            timesHit += 1;
        },
        isSunk() {
            return this.timesHit == this.length;
        }
    }
}

export default Ship;