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

    // end of the game
    if (timeLeftInMs <= 0) {
      clearInterval(timer);
      timer = null;
      gameStatusProxy.active = false;
      addHighscore();

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



// Highscore Storage functionality
const highscoreList = document.getElementById('highscore-list');
const addScoreButton = document.getElementById('add-score-btn');
const changeNameButton = document.getElementById('change-name-btn');
const currentScoreElement = document.getElementById('current-score');
const STORAGE_KEY = 'clicker-highscores';

let playerName = "";


// change name
function changeName() {
    newName = prompt("Set new player name");
    if (newName == "" || newName == null) {
        alert("Name cannot be empty");
    }
    else { 
        playerName = newName;
    }
}
changeNameButton.addEventListener('click', changeName);



function loadHighscores() {
    const highscoresFromStorage = localStorage.getItem(STORAGE_KEY)
    return highscoresFromStorage ? JSON.parse(highscoresFromStorage) : [];
}
function saveHighscores(highscores) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(highscores));
}
function displayHighscores(highscores) {
    highscoreList.innerHTML = '';
    
    highscores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name} - ${score.points} points (${score.date} - ${score.time})`;
        highscoreList.appendChild(li);
    });
}

function addHighscore() {
    if (playerName == "" || playerName == null) {
        playerName = "Empty Player";
    }
    const highscores = loadHighscores();
    const formattedTime = new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const newScore = {
        name: playerName,
        points: score,
        date: new Date().toLocaleDateString('de-DE'),
        time: formattedTime
    };
    highscores.push(newScore);
    highscores.sort((a, b) => b.points - a.points);
    
    saveHighscores(highscores);
    displayHighscores(highscores);

    score = 0;
    currentScoreElement.textContent = 0;
}


window.onload = () => {
    const highscores = loadHighscores();
    displayHighscores(highscores);
};
