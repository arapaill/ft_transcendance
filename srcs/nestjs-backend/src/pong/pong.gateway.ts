import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState } from './pong.entity';

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
    if (this.games.has(socket_id)) {
      if (this.games.get(socket_id).gameState == GameState.MENU) {
        this.games.get(socket_id).changeStateMenu(payload[0]);
        client.emit('update', this.games.get(socket_id).returnGameState());
      }
      else if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
        for (let [key, value] of this.games) {
          if (key != socket_id && (value.gameState == GameState.WAITING || value.gameState == GameState.SEARCHING)) {
            this.games.get(socket_id).addPlayer(key);                                               //Ce que je veux faire c'est chercher dans toutes les keys
            this.games.get(socket_id).addPlayer(socket_id);                                         //Si jamais on peut trouver une key qui est en train de wait,
            value = this.games.get(socket_id);                                                      //Si c pas le cas ben tu passe de SEARCHING a WAITING et t en liste d'attente
            this.games.get(socket_id).gameState = GameState.MULTI;                                  //sinon ben lets go j'essaie de mettre le même game avec deux keys differentes dans la map
          }                                                                                         //C geré de l'autre côte dans entity qui aura quel joueur avec la fonction addplayer
          if (this.games.get(socket_id).gameState == GameState.SEARCHING)                           //Mais ca a pas l'air de fonctionner donc jsp si vous allez voir mais on sait jamais.
            this.games.get(socket_id).gameState = GameState.WAITING;
        }
        this.games.get(socket_id).update(payload[0]); // PB se trouve ici malheureusement ;....:///
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.SPECTATING) { }
      else {
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
    }
    else {
      this.games.set(socket_id, new Game(socket_id));
      console.log(this.games.get(socket_id).gameState);
    }
  }
}