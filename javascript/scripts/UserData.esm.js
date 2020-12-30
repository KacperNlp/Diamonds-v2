class UserData{
    constructor(){
        if(!localStorage.length){
            localStorage.setItem('1', JSON.stringify({active:true, score:0,}));
        }
    }

    checkAvailabilityLevel(level){
        const lvl = localStorage.getItem(String(level));

        if(!lvl) return;

        const {active} = JSON.parse(lvl);

        return active;
    }

    unlockNewLevel(level){
        localStorage.setItem(String(level + 1), JSON.stringify({active:true, score:0}));
    }

    getHighestScore(level){
        const lvl = localStorage.getItem(String(level));

        if(!level) return;

        const {score} = JSON.parse(lvl);

        return score;
    }

    setNewHightScore(level, newScore){
        localStorage.setItem(String(level), JSON.stringify({active:true, score: newScore}))
    }

}

export const userData = new UserData();