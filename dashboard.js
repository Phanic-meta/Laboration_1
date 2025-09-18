const timer_start_button = document.getElementById('timer-start-button');
const timer_stop_button = document.getElementById('timer-stop-button');
const add_point_button = document.getElementById('add-point-button');
const reset_point_button = document.getElementById('reset-point-button');
const timerDisplay = document.querySelector('#game-timer p');





// Timer functionality

let varGameTime = 5;
let timer;
const totalDurationInMs = varGameTime * 1000;

function startTimer() {
  if (timer) return;
  const startTime = Date.now();

  timer = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    timeLeftInMs = totalDurationInMs - elapsedTime;

    if (timeLeftInMs <= 0) {
      clearInterval(timer);
      timer = null;

      // make the color red when the timer hiits 0 seconds
      timerDisplay.style.color = 'red';
      timerDisplay.textContent = `00:00`;
      setTimeout(() => {
        timerDisplay.style.color = 'black';
      }, 500);

      return;
    }
    const seconds = Math.floor(timeLeftInMs / 1000);
    const milliseconds = timeLeftInMs % 1000;
    const formattedMs = String(milliseconds).padStart(2, '0').substring(0, 2);
    timerDisplay.textContent = `${seconds}:${formattedMs}`;

  }, 10);
}


function stopTimer() {
  clearInterval(timer);
  timer = null;
  timeLeftInMs = totalDurationInMs;
  timerDisplay.textContent = `${varGameTime}:00`;
}


timer_start_button.addEventListener('click', startTimer);
timer_stop_button.addEventListener('click', stopTimer);



// Score functionality

let score = 0;
let pointsPerClick = 10;
const scoreboard = document.querySelector('#game-scoreboard p');


function collectPoints(){
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
