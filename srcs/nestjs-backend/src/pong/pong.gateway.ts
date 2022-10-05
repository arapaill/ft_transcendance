import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState, LeftOrRight } from './pong.entity';
import { GameHistoryService } from 'src/gameHistory/gameHistory.service';
import { OngoingGameService } from 'src/ongoingGames/ongoingGames.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credential: true,
    namespace: 'pong',
  }
})
export class PongGateway {

  private games: any;

  constructor() {
    this.games = new Map();
  }

  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    let socket_id = payload[0].SOCKET;
    let user_id = payload[0].NAME;    
    if (this.games.has(socket_id)) {
      if (this.games.get(socket_id).gameState == GameState.MENU) {
        this.games.get(socket_id).changeStateMenu(payload[0]);
        client.emit('update', this.games.get(socket_id).returnGameState());
      }
      else if (this.games.get(socket_id).gameState == GameState.OPTION) {
        this.games.get(socket_id).changeOptionMenu(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.WAITING) {
        if (payload[0].ACTION == "QUIT") {
          let color = "white";
          if (this.games.has(socket_id)) {
            color = this.games.get(socket_id).color;
            this.games.delete(socket_id);
          }
          this.games.set(socket_id, new Game(socket_id, color));
          this.games.get(socket_id).gameState = GameState.MENU;
        }
      }
      else if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
        for (let [key, value] of this.games) {
          if (key != socket_id && value.gameState == GameState.WAITING) {
            this.games.get(key).addPlayer(payload[0], user_id);
            this.games.delete(socket_id, Game);
            this.games.set(socket_id, this.games.get(key));
            this.games.get(key).gameState = GameState.MULTI;
          }
          if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
            this.games.get(socket_id).gameState = GameState.WAITING;
            this.games.get(socket_id).addPlayer(payload[0], user_id);
          }
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.MENUSPEC) {
        if (payload[0].ACTION == "QUIT") {
          this.games.get(socket_id).specMenuState = 0;
          this.games.set(socket_id, new Game(socket_id, this.games.get(socket_id).color));
          this.games.get(socket_id).gameState = GameState.MENU;
          this.games.get(socket_id).update(payload[0]);
        }
        let numberOfMatches: number = 0;
        let MatchList : any = { GAMESTATE : GameState.MENUSPEC, COLOR: this.games.get(socket_id).color, STATE: this.games.get(socket_id).specMenuState};
        let tmp : number = 0;
        for (let [key, value] of this.games) {
          if (value.gameState == GameState.MULTI) {
            if (tmp % 2 == 0) {
              let matchFound = {[numberOfMatches] : value.playerOneName + " vs " + value.playerTwoName };
              MatchList = Object.assign(MatchList, matchFound);
              numberOfMatches++;
            }
            tmp++;
          }
          if (this.games.get(socket_id).specMenuState == 0 && tmp != 0)
            this.games.get(socket_id).specMenuState++;
          MatchList = Object.assign(MatchList, { MATCHNUMBER : numberOfMatches, });
        }
        if (payload[0].ACTION == "UP") {
          if (this.games.get(socket_id).specMenuState != 0 && this.games.get(socket_id).specMenuState != 1) {
            this.games.get(socket_id).specMenuState--;
          }
        }
        if (payload[0].ACTION == "DOWN") {
          if (this.games.get(socket_id).specMenuState != numberOfMatches) {
            this.games.get(socket_id).specMenuState++;
          }
        }
        if (payload[0].ACTION == "GO") {
          tmp = 0;
          for (let [key, value] of this.games) {
            console.log(value.galeState);
            tmp++;
            if (this.games.get(socket_id).specMenuState != 0) {
              this.games.get(socket_id).gameState == GameState.SPECTATING;
              if ((this.games.get(socket_id).specMenuState == tmp || this.games.get(socket_id).specMenuState == tmp + 1))
                this.games.set(socket_id, value);
            }
          }
        }
        MatchList.STATE = this.games.get(socket_id).specMenuState;
        client.emit('update', MatchList);
      }
      else if (this.games.get(socket_id).gameState == GameState.SPECTATING) {
        if (payload[0].ACTION == "QUIT") {
          this.games.set(socket_id, new Game(socket_id, this.games.get(socket_id).color));
          this.games.get(socket_id).gameState = GameState.MENU;
          this.games.get(socket_id).update(payload[0]);
          client.emit('update', this.games.get(socket_id).returnData());
        }
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.OVER) {
        if (payload[0].ACTION == "QUIT") {
          let color = "white";
          if (this.games.has(socket_id)) {
            color = this.games.get(socket_id).color;
            this.games.delete(socket_id);
          }
          this.games.set(socket_id, new Game(socket_id, color));
          this.games.get(socket_id).gameState = GameState.MENU;
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else {
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
    }
    else {
      this.games.set(socket_id, new Game(socket_id, "white"));
    }
  }
}