import { Socket } from "dgram";

export class Entity {
    width: number;
    height: number;
    x: number;
    y: number;
    xVel: number = 0;
    yVel: number = 0;

    constructor(w: number, h: number, x: number, y: number) {       
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
    }
}

class Ball extends Entity {
    
    private speed: number = 5;
    
    constructor(w: number, h: number, x: number, y: number) {
        super(w, h, x, y);
        var randomDirection = Math.floor(Math.random() * 2) + 1; 
        if (randomDirection % 2) {
            this.xVel = 1;
        }
        else {
            this.xVel = -1;
        }
        this.yVel = 1;
    }
    
    update(playerOne: Player, playerTwo: Player, canvasHeight: number, canvasWidth: number) {
       
        //check top canvas bounds
        if (this.y <= 10) {
            this.yVel = 1;
        }
        
        //check bottom canvas bounds
        if (this.y + this.height >= canvasHeight - 10) {
            this.yVel = -1;
        }
        
        //check left canvas bounds
        if (this.x <= 0) {  
            this.x = canvasWidth / 2 - this.width / 2;
            playerOne.addScore();
        }
        
        //check right canvas bounds
        if (this.x + this.width >= canvasWidth) {
            this.x = canvasWidth / 2 - this.width / 2;
            playerTwo.addScore();
        }
    
        
        //check player one collision
        if (this.x <= playerOne.getPaddleX() + playerOne.getPaddleWidth()) {
            if (this.y >= playerOne.getPaddleY() && this.y + this.height <= playerOne.getPaddleY() + playerOne.getPaddleHeight()) {
                this.xVel = 1;
            }
        }
        
        //check player two collision
        if (this.x + this.width >= playerTwo.getPaddleX()) {
            if (this.y >= playerTwo.getPaddleY() && this.y + this.height <= playerTwo.getPaddleY() + playerTwo.getPaddleHeight()) {
                this.xVel = -1;
            }
        }
       
        this.x += this.xVel * this.speed;
        this.y += this.yVel * this.speed;
    }
}

class PlayerPaddle extends Entity {
    
    private speed:number = 10;
    
    constructor(w: number, h: number, x: number, y: number) {
        super(w, h, x, y);
    }

    update(direction: string, canvasHeight: number) : void {
        if (direction === "UP") {
            this.yVel = -1;
            if (this.y <= 20) {
                this.yVel = 0
            }
        }
        else if (direction === "DOWN") {
            this.yVel = 1;
            if (this.y + this.height >= canvasHeight - 20) {
                this.yVel = 0;
            }
        }
        else
            this.yVel = 0;
        this.y += this.yVel * this.speed;
    }
}

class ComputerPaddle extends Entity {
    
    private speed:number = 10;
    
    constructor(w: number, h: number, x: number, y: number){
        super(w, h, x, y);        
    }
    update(ball: Ball, canvasHeight: number){ 
       
        //chase ball
        if(ball.y < this.y && ball.xVel == 1){
             this.yVel = -1; 
             
             if(this.y <= 20){
                 this.yVel = 0;
             }
        }
        else if (ball.y > this.y + this.height && ball.xVel == 1){
            this.yVel = 1;
            
            if (this.y + this.height >= canvasHeight - 20) {
                this.yVel = 0;
            }
        }
        else {
            this.yVel = 0;
        }
        this.y += this.yVel * this.speed;
 
     }
}

export enum LeftOrRight {
    LEFT,
    RIGHT
}

export class Player {
    private socket: Socket;
    private paddle: Entity;
    private score: number;
    private position: number;
    private leftOrRight: LeftOrRight;

    constructor(socket: Socket, leftOrRight : LeftOrRight, type: string) {
        this.score = 0;
        this.leftOrRight = leftOrRight;
        this.socket = socket;
        if (type === "human") {
            if (this.leftOrRight = LeftOrRight.LEFT)
                this.paddle = new PlayerPaddle(10, 60, 20, 300);
            else if (this.leftOrRight = LeftOrRight.RIGHT)
                this.paddle = new PlayerPaddle(10, 60, 1180, 300);      // On regarde si jamais il est a droite ou a gauche pour la pos de base
        }
        else if (type === "computer")
            this.paddle = new ComputerPaddle(10, 60, 1180, 300);
    }

    getPosition() : number {
        return this.position;
    }

    getPaddleWidth() : number {
        return this.paddle.width;
    }

    getPaddleHeight() : number {
        return this.paddle.height;
    }

    getPaddleX() : number {
        return this.paddle.x;
    }

    getPaddleY() : number {
        return this.paddle.y;
    }

    setPaddleX(set: number) : void {
        this.paddle.x = set;
    }

    setPaddleY(set: number) : void {
        this.paddle.y = set;
    }

    getPaddleXVel() : number {
        return this.paddle.xVel;
    }

    getPaddleYVel() : number {
        return this.paddle.yVel;
    }

    setPaddleXVel(set : number) : void {
        this.paddle.xVel = set;
    }

    setPaddleYVel(set : number) : void {
        this.paddle.yVel = set;
    }

    getScore() : number {
        return this.score;
    }

    addScore() : void {
        this.score++;
    }

    update() : void {

    }
}

export enum GameState {
    MENU,
    SOLO,
    MULTI,
    OVER
}

export enum MenuState {
    SOLO,
    MULTI,
}

export class Game {
    private playerOne: Player;
    private playerTwo: Player;
    private ball: Ball;
    private menuState: MenuState;
    private gameState: GameState;
    private numberOfPlayer: number;

    constructor() {
        this.menuState = MenuState.SOLO;
        this.gameState = GameState.MENU;
    }

    getPlayerPosition(number: number) : number {
        if (number === 1)
            return this.playerOne.getPosition();
        else if (number === 2)
            return this.playerTwo.getPosition();
    }

    changeStateMenu(data: any) : void {
        switch (data.action) {
            case "LEFT": {
                this.menuState--;
            }
            case "RIGHT": {
                this.menuState++;
            }
            case "GO": {
                this.changeStateGame(data);
            }
        }
    }

    changeStateGame(data: any) : void {
        switch (this.menuState) {
            case MenuState.SOLO: {
                this.playerOne = new Player(data.socket, LeftOrRight.LEFT, "human");
                this.playerTwo = new Player(data.socket, LeftOrRight.RIGHT, "computer");
                this.gameState = GameState.SOLO;
                break ;
            }
            case MenuState.MULTI: {
                return ;
            }
        }
    }

    update(data: any) : void {
        if (this.gameState == GameState.MENU) {
            this.changeStateMenu(data.action);
            return ;                                // Ajout d'un renvoi si on lance le jeu depuis le menu
        }
        if (this.gameState == GameState.SOLO) {
            this.playerOne.update();
            this.playerTwo.update();
            this.ball.update(this.playerOne, this.playerTwo, data.canvasHeight, data.canvasWidth);
            if (this.playerOne.getScore() === 11 || this.playerTwo.getScore() === 11)
                this.gameState = GameState.OVER;
            if (this.gameState === GameState.OVER)
                this.gameState = GameState.MENU;
        }
    }

    returnData() : any {
        return {
            MENUSTATE: this.menuState,
            GAMESTATE: this.gameState,
            PADDLEONEPOS: this.playerOne.getPaddleY(),
            PADDLETWOPOS: this.playerTwo.getPaddleY(),
            SCORE1: this.playerOne.getScore(),
            SCORE2: this.playerTwo.getScore(),
            BALLX: this.ball.x,
            BALLY: this.ball.y,
        }
    }
}