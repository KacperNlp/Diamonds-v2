import { Diamond } from "./Diamond.esm.js";

export class GameState{
    constructor(requiredScore,  hightScore, userMovement, diamonds, diamondsSprite){

        this._userMovement = userMovement;
        this._currentScore = 0;
        this._gameResult = false;

        let _isMoving = false;
        let _isSwaping = false;
        let _gameMap = diamonds.map(({posX, posY, row, column, kind}) => new Diamond(posX, posY, row, column, kind));
        let _diamondsSprite = diamondsSprite;
        let _requiredScore = requiredScore

        this.decreaseMovement = () => this._userMovement--;
        this.increaseMovement = () => this._userMovement++;
        this.getMovement = () => this._userMovement;

        this.increaseCurrentScore = beatenDiamonds => this._currentScore += beatenDiamonds * 2;

        this.showHightScore = () => hightScore;
        this.showRequiredScore = () => _requiredScore;

        this.getIsMoving = () => _isMoving;
        this.setIsMoving = value => _isMoving = value;

        this.getIsSwaping = () => _isSwaping;
        this.setIsSwaping = value => _isSwaping = value;

        this.getGameMap = () => _gameMap;
        this.getDiamondsSprite = () => _diamondsSprite;

        this.isPlayerWinner = () => this._currentScore >= _requiredScore;
    }

    get userMovement(){
        return this._userMovement;
    }

    get currentScore(){
        return this._currentScore;
    }

    set gameResult(result){
        this._gameResult = result;
    }

    get gameResult(){
        return this._gameResult;
    }
}