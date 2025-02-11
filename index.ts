import { InitGame } from "./src/use-case/InitGame";
import { Player } from "./src/domain/Player";

let initGame = new InitGame();
let player1 = new Player("Aythami");
let player2 = new Player("Molo");
let player3 = new Player("Jose");
let players = [player1, player2, player3];
let game = initGame.execute(players, 1);

game.initRound();
game.playTurn(player1, "play", [0, 9]);
game.playTurn(player2, "play", [0, 9]);
game.playTurn(player3, "play", [0, 9]);
game.playTurn(player1, "pass", []);
game.playTurn(player2, "pass", []);

game.playTurn(player3, "play", [0, 8]);
game.playTurn(player1, "play", [0, 8]);
game.playTurn(player2, "play", [0, 8]);
game.playTurn(player1, "pass", []);
game.playTurn(player2, "pass", []);

game.playTurn(player1, "play", [0, 6]);
game.playTurn(player2, "play", [0, 7]);
game.playTurn(player3, "play", [0, 7]);
game.playTurn(player1, "pass", []);
game.playTurn(player2, "pass", []);

//while(noAcabeLaPartida)
//InitRonda
//while(noAcabelaRonda)
//TurnoJugadorX
