import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState, LeftOrRight } from './pong.entity';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    credential: true,
    namespace: 'pong',
  }
})
export class PongGateway {

  private games: any;

  constructor(private prisma: PrismaService) {
    this.games = new Map();

  }

  @SubscribeMessage('invitation')
  async handleInvitation(client: any, payload: any) {
    let socket_id = payload[0].SOCKET;
    if (payload[0].TYPE == "invitation") {
      if (this.games.has(socket_id))
        this.games.delete(socket_id);
      this.games.set(socket_id, new Game(payload[0].USER, "white"));
      this.games.get(socket_id).gameState = GameState.WAITINGFOR;
      this.games.get(socket_id).waitedPseudo = payload[0].USER;
    }
    else if (payload[0].TYPE == "declined") {
      this.games.get(socket_id).gameState = GameState.DECLINED;
    }
    if (payload[0].TYPE == "accepted") {
      if (this.games.has(socket_id))
        this.games.delete(socket_id);
      this.games.set(socket_id, new Game(payload[0].USER, "white"));
      this.games.get(socket_id).gameState = GameState.SEARCHINGFOR;
    }
  }

  @SubscribeMessage('spectate')
  async handleSpec(client: any, payload: any) {
    let verif = await this.prisma.ongoingGame.findFirst({
      where: {
        OR: [
          {JOUEUR_1_PSEUDO : payload[0].USER},
          {JOUEUR_2_PSEUDO : payload[0].USER},
        ]
      }
    });
    if (Object.keys(verif).length == 0) {
      client.emit('spectate', {
        ISGAME: false,
      });
    }
    else {
      client.emit('spectate', {
        ISGAME: true,
      });
      let tmp = 0;
      let socket_id = payload[0].SOCKET;
      for (let [key, value] of this.games) {
        if (value.playerOneName == payload[0].USER || value.playerTwoName == payload[0].USER) {
          this.games.set(socket_id, value);
          break ;
        }
      }
    }
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
      else if (this.games.get(socket_id).gameState == GameState.SEARCHINGFOR) {
        for (let [key, value] of this.games) {
          if (value.data_multi == this.games.data_multi) {
            this.games.get(key).addPlayer(payload[0], user_id);
            this.games.delete(socket_id);
            this.games.set(socket_id, this.games.get(key));
            this.games.get(key).gameState = GameState.MULTI;
            await this.prisma.ongoingGame.create({
              data: {
                JOUEUR_1_SOCKET : key,
                JOUEUR_1_PSEUDO : this.games.get(key).playerOneName,
                JOUEUR_2_SOCKET : socket_id,
                JOUEUR_2_PSEUDO : user_id,
              }
            });
          }
        }
        this.games.get(socket_id).update(payload[0]);
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.SEARCHING) {
        for (let [key, value] of this.games) {
          if (key != socket_id && value.gameState == GameState.WAITING) {
            this.games.get(key).addPlayer(payload[0], user_id);
            this.games.delete(socket_id);
            this.games.set(socket_id, this.games.get(key));
            this.games.get(key).gameState = GameState.MULTI;
            await this.prisma.ongoingGame.create({
              data: {
                JOUEUR_1_SOCKET : key,
                JOUEUR_1_PSEUDO : this.games.get(key).playerOneName,
                JOUEUR_2_SOCKET : socket_id,
                JOUEUR_2_PSEUDO : user_id,
              }
            });
            await this.prisma.user.update({
              where: {
                  name: this.games.get(key).playerOneName,
                },
              data: {
                match: true,
              }
            })
            await this.prisma.user.update({
              where: {
                  name: this.games.get(key).user_id,
                },
              data: {
                match: true,
              }
            })
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
        let currentgames = await this.prisma.ongoingGame.findMany();
        let numberOfMatches: number = currentgames.length;
        if (numberOfMatches != 0 && this.games.get(socket_id).specMenuState == 0)
          this.games.get(socket_id).specMenuState = 1;
        let MatchList : any = { GAMESTATE : GameState.MENUSPEC, COLOR: this.games.get(socket_id).color, STATE: this.games.get(socket_id).specMenuState};
        for (let i = 0; i < numberOfMatches; i++) {
          let matchFound = {[i + 1] : currentgames[i].JOUEUR_1_PSEUDO + " vs " + currentgames[i].JOUEUR_2_PSEUDO }
          MatchList = Object.assign(MatchList, matchFound);
        }
        MatchList = Object.assign(MatchList, { MATCHNUMBER : numberOfMatches, });
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
          let tmp = 0;
          for (let [key, value] of this.games) {
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
      else if (this.games.get(socket_id).gameState == GameState.DECLINED) {
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
      else if (this.games.get(socket_id).gameState == GameState.DESTROYINGGAME) {
        this.games.get(socket_id).gameState = GameState.OVER;
        await this.prisma.ongoingGame.deleteMany({
          where: {
            JOUEUR_1_SOCKET: socket_id,
          }
        });
        await this.prisma.ongoingGame.deleteMany({
          where: {
            JOUEUR_2_SOCKET: socket_id,
          }
        });
        await this.prisma.user.update({
          where: {
              name : this.games.get(socket_id).playerOneName,
            },
            data : {
              match: false,
            },
          });
        await this.prisma.user.update({
          where: {
              name : this.games.get(socket_id).playerTwoName,
            },
            data : {
              match: false,
            },
          });
        await this.prisma.gameHistory.create({
          data: {
            JOUEUR_1: this.games.get(socket_id).playerOneName,
            JOUEUR_2: this.games.get(socket_id).playerTwoName,
            VAINQUEUR: this.games.get(socket_id).winner,
          }
        })

        await this.prisma.user.update({
          where: {
            name: this.games.get(socket_id).winner,
          },
          data: {
            wins: {increment: 1},
          }
        });

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