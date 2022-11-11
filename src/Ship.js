const Ship = (length) => {
    return {
        length,
        timesHit: 0,
        isSunk: false,
        hit() {
            this.timesHit += 1;
        },
        isSunk() {
            return length == this.timesHit;
        }
    };
}

export default Ship;