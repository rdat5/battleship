import Gameboard from "../src/Gameboard.js";

test("Gameboard can place ships at specific coordinates", () => {
    const testGameboard = Gameboard(10);
    testGameboard.placeShip(0, 1, 1, false);
    testGameboard.placeShip(1, 3, 4, true);

    // console.log(testGameboard.printBoard());

    expect(testGameboard.getCell(1, 1).contents).toBe(testGameboard.ships[0]);
    expect(testGameboard.getCell(5, 1).contents).toBe(testGameboard.ships[0]);
    expect(testGameboard.getCell(3, 3).contents).toBe(null);
});

test("Gameboard can receive an attack", () => {
    const testGameboard = Gameboard(10);
    testGameboard.placeShip(0, 1, 1, false);

    testGameboard.recieveAttack(2, 1);

    expect(testGameboard.ships[0].timesHit).toBe(1);
    expect(testGameboard.getCell(2, 1).isStruck).toBe(true);
})

test.only("Gameboard can report if all ships have been sunk", () => {
    const testGameboard = Gameboard(10);

    testGameboard.ships.forEach(ship => {
        for (let i = 0; i < ship.length; i++) {
            ship.hit();
        }
    });

    expect(testGameboard.areAllShipsSunk()).toBe(true);
});