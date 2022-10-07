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
    
    update(playerOneY: number, playerTwoY: number, canvasHeight: number, canvasWidth: number) : number {
       
        let scoreModifier  = 0;
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
            this.speed = 5;
            scoreModifier++;
        }
        
        //check right canvas bounds
        if (this.x + this.width >= canvasWidth) {
            this.speed = 5;
            this.x = canvasWidth / 2 - this.width / 2;
            scoreModifier--;
        }
    
        
        //check player one collision
        if (this.x <= canvasWidth / 50 * 2) {
            if (this.y >= playerOneY && this.y + this.height <= playerOneY + canvasHeight / 8) {
                this.xVel = 1;
            if (this.speed < 10)
                this.speed++;
            }
        }
        
        //check player two collision
        if (this.x + this.width >= canvasWidth / 50 * 48) {
            if (this.y >= playerTwoY && this.y + this.height <= playerTwoY + canvasHeight / 8) {
                this.xVel = -1;
            if (this.speed < 10)
                this.speed++;
            }
        }
        this.x += this.xVel * this.speed;
        this.y += this.yVel * this.speed;
        return scoreModifier;
    }
}

class PlayerPaddle extends Entity {
    
    private speed:number = 20;
    
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
    
    private speed:number = 6;
    
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
    socket: any;
    paddle: PlayerPaddle;
    score: number;
    position: number;
    leftOrRight: LeftOrRight;
    state: string;

    constructor(data: any, leftOrRight : LeftOrRight) {
        this.score = 0;
        this.state = "iddle";
        this.leftOrRight = leftOrRight;
        this.socket = data.SOCKET;
        if (this.leftOrRight = LeftOrRight.LEFT)
            this.paddle = new PlayerPaddle(10, 60, 0 + data.WIDTH / 18, data.HEIGHT / 2);
        else if (this.leftOrRight = LeftOrRight.RIGHT)
            this.paddle = new PlayerPaddle(10, 60, data.WIDTH - data.WIDTH / 18, data.HEIGHT / 2);      // On regarde si jamais il est a droite ou a gauche pour la pos de base
    }
}


export enum GameState {
    MENU,
    SOLO,
    MULTI,
    SEARCHING,
    WAITING,
    SPECTATING,
    OVER,
    MENUSPEC,
    OPTION,
    DESTROYINGGAME,
    WAITINGFOR,
    DECLINED,
    SEARCHINGFOR,
}

export enum MenuState {
    SOLO,
    MULTI,
    SPECTATE,
    OPTION,
}

export enum OptionState {
    WHITE,
    BLUE,
    GREEN,
    YELLOW,
    RED,
}

export class Game {
    playerOne: Player;
    playerTwo: Player;
    playerOneName : string;
    playerTwoName : string;
    private computerPaddle : ComputerPaddle;
    private computerScore : number;
    private ball: Ball;
    menuState: MenuState;
    gameState: GameState;
    optionState : OptionState;
    private numberOfPlayer: number;
    data_multi: any
    winner: any;
    color: string;
    equilibrium: number;
    specMenuState: number;
    waitedPseudo: string;

    constructor(data : any, color : string) {
        this.data_multi = data;
        this.specMenuState = 0;
        this.color = color;
        this.equilibrium = 0;
        this.optionState = OptionState.WHITE;
        this.menuState = MenuState.SOLO;
        this.gameState = GameState.MENU;
        this.computerScore = 0;
    }

    getPlayerPosition(number: number) : number {
        if (number === 1)
            return this.playerOne.position;
        else if (number === 2)
            return this.playerTwo.position;
    }

    changeOptionMenu(data: any) : void {
        switch (data.ACTION) {
            case "LEFT": {
                if (this.optionState != 0)
                    this.optionState--;
                break ;
            }
            case "RIGHT": {
                if (this.optionState != 4)
                    this.optionState++;
                break ;
            }
            case "GO": {
                switch (this.optionState) {
                    case OptionState.BLUE: {
                        this.color = "blue";
                        break ;
                    }
                    case OptionState.RED: {
                        this.color = "red";
                        break ;
                    }
                    case OptionState.YELLOW: {
                        this.color = "yellow";
                        break ;
                    }
                    case OptionState.WHITE: {
                        this.color = "white";
                        break ;
                    }
                    case OptionState.GREEN: {
                        this.color = "green";
                        break ;
                    }
                }
                break ;
            }
            case "QUIT": {
                this.gameState = GameState.MENU;
            }
        }
    }

    changeStateMenu(data: any) : void {
        switch (data.ACTION) {
            case "LEFT": {
                if (this.menuState != 0)
                    this.menuState--;
                break ;
            }
            case "RIGHT": {
                if (this.menuState != 3)
                    this.menuState++;
                break ;
            }
            case "GO": {
                this.changeStateGame(data);
                break ;
            }
        }
    }

    addPlayer(data: any, user_id: string) : void {
        if (this.playerOne == undefined) {
            this.playerOneName = user_id;
            this.playerOne = new Player(data, LeftOrRight.LEFT);
        }
        else {
            this.playerTwoName = user_id;
            this.playerTwo = new Player(data, LeftOrRight.RIGHT);
        }
    }

    changeStateGame(data: any) : void {
        switch (this.menuState) {
            case MenuState.SOLO: {
                this.playerOne = new Player(data, LeftOrRight.LEFT);
                this.playerOneName = data.NAME;
                this.computerPaddle = new ComputerPaddle(data.WIDTH / 50, data.HEIGHT / 10, data.WIDTH / 50 * 48, data.HEIGHT / 2);
                this.playerTwoName = "Computer";
                this.gameState = GameState.SOLO;
                this.ball = new Ball(data.WIDTH / 50, data.HEIGHT / 50, data.WIDTH / 2, data.HEIGHT / 2);
                break ;
            }
            case MenuState.MULTI: {
                this.gameState = GameState.SEARCHING;
                this.ball = new Ball(data.WIDTH / 50, data.HEIGHT / 50, data.WIDTH / 2, data.HEIGHT / 2);
                break ;
            }
            case MenuState.OPTION: {
                this.gameState = GameState.OPTION;
                break ;
            }
            case MenuState.SPECTATE: {
                this.gameState = GameState.MENUSPEC;
            }
        }
    }

    update(data: any) : void {
        let scoreModifier : number;
        if (this.gameState == GameState.MENU) {
            this.changeStateMenu(data);
            return ;                               
        }
        if (this.gameState == GameState.SOLO) {
            if (data.ACTION == "QUIT") {
                this.winner = "Computer";
                this.gameState = GameState.OVER;
                return ;
            }
            this.playerOne.paddle.update(data.ACTION, data.HEIGHT);
            this.computerPaddle.update(this.ball, data.HEIGHT);
            if (data.ACTION == undefined)
                scoreModifier = this.ball.update(this.playerOne.paddle.y, this.computerPaddle.y, data.HEIGHT, data.WIDTH);
            if (scoreModifier === -1)
                this.playerOne.score++;
            else if (scoreModifier === 1)
                this.computerScore++;
                if (this.playerOne.score === 11 || this.computerScore === 11) {
                    this.gameState = GameState.OVER;
                    if (this.playerOne.score == 11)
                        this.winner = this.playerOneName;
                    else
                        this.winner = this.playerTwoName;
                }
        }
        else if (this.gameState == GameState.MULTI) {
            if (data.ACTION == "QUIT") {
                if (data.SOCKET == this.playerOne.socket)
                    this.winner = this.playerTwoName;
                else
                    this.winner = this.playerOneName;
                if (data.SOCKET == this.playerOne.socket || data.SOCKET == this.playerTwo.socket)
                    this.gameState = GameState.DESTROYINGGAME;
                return ;
            }
            if (data.SOCKET == this.playerOne.socket)
                this.playerOne.paddle.update(data.ACTION, data.HEIGHT);
            else if (data.SOCKET == this.playerTwo.socket)
                this.playerTwo.paddle.update(data.ACTION, data.HEIGHT);
            if (data.ACTION == undefined && this.equilibrium % 2 && (data.SOCKET == this.playerOne.socket || data.SOCKET == this.playerTwo.socket))
                scoreModifier = this.ball.update(this.playerOne.paddle.y, this.playerTwo.paddle.y, data.HEIGHT, data.WIDTH);
            this.equilibrium++;
            if (scoreModifier === -1)
                this.playerOne.score++;
            else if (scoreModifier === 1)
                this.playerTwo.score++;
            if (this.playerOne.score === 11 || this.playerTwo.score === 11) {
                this.gameState = GameState.DESTROYINGGAME;
                if (this.playerOne.score == 11)
                    this.winner = this.playerOneName;
                else
                    this.winner = this.playerTwoName;
            }
        }
        else if (this.gameState == GameState.SPECTATING) {
            if (this.playerOne.score === 11 || this.playerTwo.score === 11) {
                this.gameState = GameState.OVER;
                if (this.playerOne.score === 11)
                    this.winner = this.playerOneName;
                else
                    this.winner = this.playerTwoName;
            }
        }
        else if (this.gameState == GameState.DESTROYINGGAME)
            this.gameState = GameState.OVER;
    }

    returnGameState() : any {
        return {
            MENUSTATE: this.menuState,
            GAMESTATE: this.gameState,
            COLOR: this.color,
        }
    }

    returnData() : any {
        if (this.gameState == GameState.MULTI || this.gameState == GameState.SPECTATING) {
            return {
                GAMESTATE: this.gameState,
                NAME1: this.playerOneName,
                NAME2: this.playerTwoName,
                PADDLEONEPOS: this.playerOne.paddle.y,
                PADDLETWOPOS: this.playerTwo.paddle.y,
                SCORE1: this.playerOne.score,
                SCORE2: this.playerTwo.score,
                BALLX: this.ball.x,
                BALLY: this.ball.y,
                COLOR: this.color,
            }
        }
        else if (this.gameState == GameState.SOLO) {
            return {
                GAMESTATE: this.gameState,
                NAME1: this.playerOneName,
                NAME2: this.playerTwoName,
                PADDLEONEPOS: this.playerOne.paddle.y,
                PADDLETWOPOS: this.computerPaddle.y,
                SCORE1: this.playerOne.score,
                SCORE2: this.computerScore,
                BALLX: this.ball.x,
                BALLY: this.ball.y,
                COLOR: this.color,
            }
        }
        else if (this.gameState == GameState.OVER)
        {
            return {
                GAMESTATE: this.gameState,
                WINNER: this.winner,
                COLOR: this.color,
            }
        }
        else if (this.gameState == GameState.OPTION)
        {
            return {
                GAMESTATE: this.gameState,
                OPTIONSTATE: this.optionState,
                COLOR: this.color,
            }
        }
        else if (this.gameState == GameState.WAITINGFOR) {
            return {
                GAMESTATE: this.gameState,
                COLOR: this.color,
                PSEUDO: this.waitedPseudo,
            }
        }
        else {
            return {
                GAMESTATE: this.gameState,
                COLOR: this.color,
            }
        }
    }
}
