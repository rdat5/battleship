import Gameboard from "../src/Gameboard.js";

test("Gameboard can place ships at specific coordinates", () => {
    const testGameboard = Gameboard(10);
    testGameboard.placeShip(0, 1, 1, false);
    testGameboard.placeShip(1, 3, 4, true);

    console.log(testGameboard.printBoard());

    // expect(testGameboard.getCell(1, 1).contents).toBe(testGameboard.ships[0]);
    // expect(testGameboard.getCell(1, 2).contents).toBe(testGameboard.ships[4]);
    // expect(testGameboard.getCell(3, 3).contents).toBe(null);
});