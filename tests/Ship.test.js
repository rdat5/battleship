import Ship from "../src/Ship.js";

test(`Ship's hit function increments hits`, () => {
    const testShip = Ship(4);

    testShip.hit();
    testShip.hit();

    expect(testShip.timesHit).toBe(2);
});