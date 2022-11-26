import Player from "../src/Player.js";

test("Player can see all available targets on opponent's board", () => {
    const testPlayer = new Player();
    const testOpponent = new Player();

    testPlayer.setOpponentBoard(testOpponent);
    testOpponent.setOpponentBoard(testPlayer);

    console.log(testPlayer.getPossibleTargets());
});