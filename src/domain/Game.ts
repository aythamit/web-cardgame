import {Player} from "./Player";
import {PlayerPlay} from "./PlayerPlay";

export type RoundType = "normal" | "stairs";
export type PlayType = "play" | "pass";

export class Game {
  private players: Player[];
  private currentPlayer: Player;
  private currentRound: number;
  private currentPlayerIndex: number;
  private cardsOnPlay: PlayerPlay[];
  constructor(players: Player[]) {
    this.players = players;
    this.currentPlayer = players[0];
    this.currentPlayerIndex = 0;
    this.currentRound = 0;
    this.cardsOnPlay = [];
  }

  initRound(currentPlayerIndex: number = 0) {
    this.currentRound++;
    this.cardsOnPlay = [];
    this.currentPlayerIndex = currentPlayerIndex;
    this.currentPlayer = this.players[this.currentPlayerIndex];

    console.log(`\n\nRonda número ${this.currentRound}`);
    console.log(`Empìeza el jugador: ${this.currentPlayer.getName()}`);
  }

  finishRound() {
    let lastPlays = this.getLastPlayOnTable();

    if (lastPlays != null) {
      let playerWinnerIndex = this.players.findIndex(
        (player) => player === lastPlays.getPlayer(),
      );
      this.initRound(playerWinnerIndex);
    }
    // this.currentPlayerIndex = currentPlayerIndex;
  }

  private getLastPlayOnTable() {
    let index = this.cardsOnPlay.length - 1;
    let lastPlay = null;
    while (index >= 0 && index < this.cardsOnPlay.length && lastPlay == null) {
      if (this.cardsOnPlay[index].getPlayType() === "play") {
        lastPlay = this.cardsOnPlay[index];
      }
      index--;
    }
    return lastPlay;
  }

  private isRoundFinished() {
    let indexIsFinished = false;
    let lastPlay = this.getLastPlayOnTable();
    if (lastPlay != null) {
      indexIsFinished = this.currentPlayer === lastPlay.getPlayer();
    }
    return indexIsFinished;
  }

  playTurn(player: Player, playType: PlayType, cardsPlayed: number[]) {
    console.log(`\n Playturn`);
    if (this.currentPlayer === player) {
      if (playType === "play") {
        console.log(` ---- ${player.getName()} juega ----`);

        let playedCards = player.playCard(
          cardsPlayed,
          this.cardsOnPlay[this.cardsOnPlay.length - 1],
        );
        if (playedCards.length > 0) {
          this.cardsOnPlay.push(new PlayerPlay(player, playType, playedCards));
        } else {
          return;
        }
      }

      if (playType === "pass") {
        console.log(` ---- ${player.getName()} PASA ----`);
        this.cardsOnPlay.push(new PlayerPlay(player, playType, []));
      }
      this.checkNextPlayerCards()
      console.log(`Current player: ${this.currentPlayer.getName()}`);

      if (this.isRoundFinished()) {
        console.log("Finalizado la ronda");
        this.finishRound();
      } else {
        console.log("Se sigue jugando");
      }
    } else {
      console.error(`Aún no te toca ${player.getName()}`);
    }
  }

  private checkNextPlayerCards(){
    this.currentPlayerIndex++;
    let count = 0;
    this.currentPlayer =
        this.players[this.currentPlayerIndex % this.players.length];

    while(this.currentPlayer.getHandLength() == 0 && count < this.players.length - 1) {

      console.log(`${this.currentPlayer.getName()} no tiene cartas, pasamos al siguiente`);
      count++;
      this.currentPlayerIndex++;
      this.currentPlayer =
          this.players[this.currentPlayerIndex % this.players.length];
    }
  }
}
