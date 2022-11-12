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
