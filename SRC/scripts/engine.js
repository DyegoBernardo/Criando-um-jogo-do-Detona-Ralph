const state = {
    view :{
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    valeus: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval (randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.valeus.currentTime--;
    state.view.timeLeft.textContent = state.valeus.currentTime;

    if(state.valeus.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.valeus.result);
    }
}

function playSound (){
    let audio = new Audio("./SRC/audios/hit.m4a");
    audio.play();
    audio.volume = 0.2;
}

function randomSquare(){
    state.view.squares.forEach((square) => {
    square.classList.remove("enemy");    
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.valeus.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if (square.id === state.valeus.hitPosition) {
                state.valeus.result ++
                state.view.score.textContent = state.valeus.result;
                state.valeus.hitPosition = null;
                playSound();
            }
        });
    });
}

function init() {
    addListenerHitBox();
}

init();

