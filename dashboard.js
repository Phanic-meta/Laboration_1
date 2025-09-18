const timer_start_button = document.getElementById('timer-start-button');
const timer_stop_button = document.getElementById('timer-stop-button');
const add_point_button = document.getElementById('add-point-button');
const reset_point_button = document.getElementById('reset-point-button');
const timerDisplay = document.querySelector('#game-timer p');


let timer;
let timeLeftInMs = 40 * 1000;
const totalDurationInMs = 40 * 1000;

function startTimer() {
  if (timer) return;
  const startTime = Date.now(); // Zeitpunkt des Starts speichern

  timer = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    timeLeftInMs = totalDurationInMs - elapsedTime;

    if (timeLeftInMs <= 0) {
      clearInterval(timer);
      timer = null;
      timerDisplay.textContent = `Time is up!`;
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
  // Setze die Zeit auf den ursprünglichen Wert zurück
  timeLeftInMs = totalDurationInMs;
  timerDisplay.textContent = `Hello World`;
}


timer_start_button.addEventListener('click', startTimer);
timer_stop_button.addEventListener('click', stopTimer);
