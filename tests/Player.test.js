import Player from "../src/Player.js";
import Gameboard from "../src/Gameboard.js";

test("Player can see all available targets on opponent's board", () => {
    const testP1 = new Player();
    const p2Board = Gameboard(2);

    expect(testP1.getPossibleTargets(p2Board)).toStrictEqual(
        [ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 } ]
    );
});

test.only("Player can choose a random available target", () => {
    const testP1 = new Player();
    const p2Board = Gameboard(10);

    console.log(testP1.pickRandomTarget(p2Board));
});