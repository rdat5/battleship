import Ship from "../src/Ship.js";

test('Ship hit method increments timesHit', () => {
    const testShip = Ship(3);
    testShip.hit();
    expect(testShip.timesHit).toEqual(1);
});

test('isSunk method checks if timesHit is equal to ship length', () => {
    const testShip = Ship(2);
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
})
