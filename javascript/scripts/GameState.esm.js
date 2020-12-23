export class GameState{
    constructor(level, requiredScore,  hightScore, currentScore, userMovement){
        const requiredScore = requiredScore;
        const hightScore = hightScore;
        const level = level;

        this._userMovement = userMovement;
        this._currentScore = currentScore;
        this._gameResult = false;

        this.decreaseMovement = () => this._userMovement--;
        this.increaseMovement = () => this._userMovement++;

        this.increaseCurrentScore = beatenDiamonds => this._currentScore += beatenDiamonds*30;

        this.showHightScore = () => hightScore;
        this.showRequiredScore = () => requiredScore;
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