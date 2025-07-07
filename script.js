
const container = document.getElementById('puzzle-container');
const timerDisplay = document.getElementById('timer');
const size = 3;
let tiles = [];
let emptyIndex = size * size - 1;
let timer;
let timeLeft = 120;
let timerStarted = false;

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏳ Time's up! Better luck next time.");
      init(); // restart game
    }
  }, 1000);
}

function shuffle(array) {
  for (let i = array.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {
  container.innerHTML = '';
  tiles.forEach((tile, i) => {
    const div = document.createElement('div');
    div.className = 'tile';
    if (tile === null) {
      div.classList.add('empty');
    } else {
      const x = tile % size;
      const y = Math.floor(tile / size);
      div.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
    }
    div.addEventListener('click', () => moveTile(i));
    container.appendChild(div);
  });
}

function moveTile(index) {
  const moves = [-1, 1, -size, size];
  for (const move of moves) {
    const target = index + move;
    if (
      tiles[target] === null &&
      Math.abs(target % size - index % size) + Math.abs(Math.floor(target / size) - Math.floor(index / size)) === 1
    ) {
      [tiles[index], tiles[target]] = [tiles[target], tiles[index]];
      if (!timerStarted) {
        startTimer();
        timerStarted = true;
      }
      render();
      if (isSolved()) {
        clearInterval(timer);
        setTimeout(() => alert("🎉 You did it! Here’s your code: SLIDER10"), 200);
      }
      return;
    }
  }
}

function isSolved() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i) return false;
  }
  return true;
}

function init() {
  tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i));
  shuffle(tiles);
  timerStarted = false;
  timeLeft = 120;
  timerDisplay.textContent = '02:00';
  clearInterval(timer);
  render();
}

init();
