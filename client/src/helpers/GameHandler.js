export default class GameHandler {
  constructor(scene) {
    this.gameState = "waiting";
    this.isMyTurn = false;
    this.turnCount = 0;
    this.myHand = [];
    this.playerIds = [];
    this.opponentHandCounts = {};
    this.deck = [];
    this.discardPile = [];

    this.endTurn = () => {
      this.isMyTurn = false;
      this.turnCount++;
    };

    this.setGameState = (newGameState) => {
      this.gameState = newGameState;
    };
  }
}
