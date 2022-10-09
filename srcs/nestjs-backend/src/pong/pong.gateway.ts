import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Game, GameState, Ball, Entity } from './pong.entity';
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
    let socket_id = payload[0].MYSOCKET;
    let user = payload[0].MYUSER;
    let user_iv = payload[0].USER;
    if (payload[0].TYPE == "Demande") {
      if (this.games.has(socket_id))
        this.games.delete(socket_id);
      this.games.set(socket_id, new Game(payload[0].MYUSER, "white"));
      this.games.get(socket_id).gameState = GameState.WAITINGFOR;
      this.games.get(socket_id).waitedPseudo = payload[0].USER;
    }
    else if (payload[0].TYPE == "Refuse") {
      for (let [key, value] of this.games) {
        if (value.waitedPseudo = user && key != socket_id) {
          let color = this.games.get(key).color;
          this.games.get(key).gameState = GameState.DECLINED;
        }
      }
    }
    if (payload[0].TYPE == "Accepte") {
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
    let socket_id = payload[0].MYSOCKET;
    let playerOne = verif.JOUEUR_2_PSEUDO;
    let playerTwo = verif.JOUEUR_2_PSEUDO;
    for (let [key, value] of this.games) {
      if (value.playerOneName == playerOne || value.playerTwoName == playerTwo) {
        this.games.set(socket_id, this.games.get(verif.JOUEUR_1_SOCKET));
        this.games.get(socket_id).gameState = GameState.MULTI;
        client.emit('update', value.returnData());
        break ;
      }
    }
  }
  
  
  @SubscribeMessage('update')
  async handleAction(client: any, payload: any) {
    let socket_id = payload[0].SOCKET;
    let user_id = payload[0].NAME;
    if (this.games.has(socket_id)) {
      if (this.games.get(socket_id).gameState == GameState.MENU) {
        let test = await this.prisma.ongoingGame.findFirst({
          where: {
            OR:[
              {JOUEUR_1_PSEUDO : user_id},
              {JOUEUR_2_PSEUDO : user_id},
            ]
          }
        });
        if (test != null) {
          this.games.delete(socket_id);
          if (test.JOUEUR_1_PSEUDO == user_id) {
            this.games.get(test.JOUEUR_2_SOCKET).playerOne.socket_id = socket_id;
            this.games.set(socket_id, this.games.get(test.JOUEUR_2_SOCKET));
            this.games.get(socket_id).gameState = GameState.MULTI;
            this.games.get(socket_id).playerOne.socket = socket_id;
          }
          if (test.JOUEUR_2_PSEUDO == user_id) {
            this.games.get(test.JOUEUR_1_SOCKET).playerTwo.socket_id = socket_id;
            this.games.set(socket_id, this.games.get(test.JOUEUR_1_SOCKET));
            this.games.get(socket_id).gameState = GameState.MULTI;
            this.games.get(socket_id).playerTwo.socket = socket_id;
          }
          this.games.get(socket_id).update(payload[0]);
          client.emit('update', this.games.get(socket_id).returnData());
          return ;
        }
        this.games.get(socket_id).changeStateMenu(payload[0]);
        if (this.games.get(socket_id).gameState == GameState.MENU)
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
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.WAITINGFOR) {
        if (this.games.get(socket_id).playerOne == undefined) {
          this.games.get(socket_id).ball = new Ball(payload[0].WIDTH / 50, payload[0].HEIGHT / 50, payload[0].WIDTH / 2, payload[0].HEIGHT / 2);
          this.games.get(socket_id).addPlayer(payload[0], user_id);
        }
        client.emit('update', this.games.get(socket_id).returnData());
      }
      else if (this.games.get(socket_id).gameState == GameState.SEARCHINGFOR) {
        let tmp = 0;
        for (let [key, value] of this.games) {
          if (this.games.get(key).gameState == GameState.WAITINGFOR && value.waitedPseudo == user_id) {
            this.games.get(key).addPlayer(payload[0], value.waitedPseudo);
            this.games.delete(socket_id);
            this.games.set(socket_id, this.games.get(key));
            this.games.get(key).gameState = GameState.MULTI;
            let name1 : string = this.games.get(key).playerOneName;
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
                name: name1,
                },
                data: {
                  match: true,
                }	
                
              });
            await this.prisma.user.update({
              where: {
                name: user_id,
                },
                data: {
                  match: true,
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
            let name1 : string = this.games.get(key).playerOneName;
            await this.prisma.ongoingGame.create({
              data: {
                JOUEUR_1_SOCKET : key,
                JOUEUR_1_PSEUDO : name1,
                JOUEUR_2_SOCKET : socket_id,
                JOUEUR_2_PSEUDO : user_id,
              }
            });
            await this.prisma.user.update({
              where: {
                name: name1,
                },
                data: {
                  match: true,
                }	
                
              });
            await this.prisma.user.update({
              where: {
                name: user_id,
                },
                data: {
                  match: true,
                }	
                
              });
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
          let tmp = await this.prisma.ongoingGame.findMany({});
          this.games.set(socket_id, this.games.get(tmp[this.games.get(socket_id).specMenuState - 1].JOUEUR_1_SOCKET));
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
      else if (this.games.get(socket_id).gameState == GameState.DESTROYINGGAME) {
        this.games.get(socket_id).gameState = GameState.OVER;
        await this.prisma.ongoingGame.deleteMany({
          where: {
            OR:[
              {JOUEUR_1_PSEUDO : user_id},
              {JOUEUR_2_PSEUDO : user_id},
              {JOUEUR_1_SOCKET : socket_id},
              {JOUEUR_2_SOCKET : socket_id}, 
            ]
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
    else 
        this.games.set(socket_id, new Game(socket_id, "white"));
  }
}