import Ship from "../src/Ship.js";

test('Ship hit method increments timesHit', () => {
    const testShip = Ship(3);
    testShip.hit();
    expect(testShip.timesHit).toEqual(1);
});