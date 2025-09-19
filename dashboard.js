const timer_start_button = document.getElementById('timer-start-button');
const timer_stop_button = document.getElementById('timer-stop-button');
const add_point_button = document.getElementById('add-point-button');
const reset_point_button = document.getElementById('reset-point-button');
const timerDisplay = document.querySelector('#game-timer p');
const scoreboard = document.querySelector('#game-scoreboard p');
const activetest = document.querySelector('#game-canvas p');





// Timer functionality
let varGameTime = 5;
let timer;
const totalDurationInMs = varGameTime * 1000;


// ActiveGame state
const gameState = {
  active: false
};

const gameStatusProxy = new Proxy(gameState, {
  set(target, property, value) {
    if (property === 'active') {
      activetest.textContent = `Status: ${value}`;
    }
    target[property] = value;
    return true;
  }
});




// starting the countdown
function startTimer() {
  if (timer) return;

  resetPoints(); // reset scrore when new game starts
  gameStatusProxy.active = true;

  const startTime = Date.now();

  timer = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    timeLeftInMs = totalDurationInMs - elapsedTime;

    if (timeLeftInMs <= 0) {
      clearInterval(timer);
      timer = null;
      
      gameStatusProxy.active = false;

      // make the color red when the timer hiits 0 seconds
      timerDisplay.style.color = 'red';
      scoreboard.style.color = 'red';
      timerDisplay.textContent = `00:00`;
      setTimeout(() => {
        timerDisplay.style.color = 'black';
        scoreboard.style.color = 'black';
      }, 500);

      return;
    }
    const seconds = Math.floor(timeLeftInMs / 1000);
    const milliseconds = timeLeftInMs % 1000;
    const formattedMs = String(milliseconds).padStart(2, '0').substring(0, 2);
    timerDisplay.textContent = `${seconds}:${formattedMs}`;

  }, 10);
}

// stop & reset
function stopTimer() {
  clearInterval(timer);
  timer = null;

  gameStatusProxy.active = false;
  timeLeftInMs = totalDurationInMs;
  timerDisplay.textContent = `${varGameTime}:00`;
}

timer_start_button.addEventListener('click', startTimer);
timer_stop_button.addEventListener('click', stopTimer);
gameStatusProxy.active = false;




// Score functionality

let score = 0;
let pointsPerClick = 10;

function collectPoints(){
    if (!gameStatusProxy.active) return;
    score += pointsPerClick;
    scoreboard.textContent = `${score} points`;
}

function resetPoints(){
    score = 0;
    scoreboard.textContent = `${score} points`;
}

add_point_button.addEventListener('click', () => {
    collectPoints();
});

reset_point_button.addEventListener('click', () => {
    resetPoints();
});
