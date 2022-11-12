import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

test('Gameboard can place ships at specific coordinates', () => {
    const testBoard = Gameboard(4);
    const tShp = Ship(2);
    testBoard.placeShip(1, 1, tShp, true);
    expect(testBoard.board).toEqual(
        [
            [null, null, null, null],
            [null, tShp, null, null],
            [null, tShp, null, null],
            [null, null, null, null]
        ]
    );
});

test('receiveAttack function sends hit function to ship at coordinates', () => {
    const testBoard = Gameboard(4);
    const tShp = Ship(2);
    testBoard.placeShip(1, 1, tShp, true);
    testBoard.receiveAttack(1, 2);
    expect(tShp.timesHit).toBe(1);
});

test('Gameboard keeps track of missed shots', () => {
    const testBoard = Gameboard(4);
    const tShp = Ship(2);
    testBoard.placeShip(1, 1, tShp, true);
    testBoard.receiveAttack(0, 3);
    testBoard.receiveAttack(2, 2);
    expect(testBoard.missedShots).toEqual([
        [0, 3],
        [2, 2]
    ]);
});