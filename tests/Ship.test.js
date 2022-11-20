import Ship from "../src/Ship.js";

test(`Ship's hit function increments hits`, () => {
    const testShip = Ship(4);

    testShip.hit();
    testShip.hit();

    expect(testShip.timesHit).toBe(2);
});

test(`Ship's isSunk function can tell if it's sunk`, () => {
    const testShip = Ship(4);

    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();

    expect(testShip.isSunk()).toBe(true);
});