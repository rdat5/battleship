import Player from "../src/Player.js";
import Ship from "../src/Ship.js";

test('Players can attack each other', () => {
    const testPlayerA = new Player(false);
    const testPlayerB = new Player(false);
    const testShipA1 = Ship(3);
    const testShipB1 = Ship(3);

    testPlayerA.addOpponentBoard(testPlayerB);
    testPlayerB.addOpponentBoard(testPlayerA);

    testPlayerA.gameBoard.placeShip(3, 4, testShipA1, false);
    testPlayerB.gameBoard.placeShip(6, 2, testShipB1, true);

    testPlayerA.attackTarget(6, 3);
    testPlayerA.attackTarget(6, 4);
    testPlayerB.attackTarget(5, 4);

    expect(testPlayerB.gameBoard.placedShips[0].timesHit).toBe(2);
    expect(testPlayerA.gameBoard.placedShips[0].timesHit).toBe(1);
});

test('Computer player can make random plays', () => {
    const testPlayerA = new Player(false);
    const testPlayerB = new Player(true);
    const testShipA1 = Ship(3);
    const testShipB1 = Ship(3);

    testPlayerA.addOpponentBoard(testPlayerB);
    testPlayerB.addOpponentBoard(testPlayerA);

    testPlayerA.gameBoard.placeShip(3, 4, testShipA1, false);
    testPlayerB.gameBoard.placeShip(6, 2, testShipB1, true);

    testPlayerB.attackTarget();
    expect(testPlayerB.shotsMade.length > 0).toBe(true);
});