const container = document.getElementById('puzzle-container');
const imageUrl = 'IMG_4750.jpg'; // Replace with your image file name
const size = 3;
let tiles = [];
let emptyIndex = size * size - 1;
let startTime = null;
let timerInterval;

function shuffle(array) {
  for (let i = array.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {
  container.innerHTML = '';
  const tileSize = container.offsetWidth / size;

  tiles.forEach((tile, i) => {
    const div = document.createElement('div');
    div.className = 'tile';
    if (tile === null) {
      div.classList.add('empty');
    } else {
      const x = tile % size;
      const y = Math.floor(tile / size);
      div.style.width = `${tileSize}px`;
      div.style.height = `${tileSize}px`;
      div.style.backgroundImage = `url(${imageUrl})`;
      div.style.backgroundSize = `${tileSize * size}px ${tileSize * size}px`;
      div.style.backgroundPosition = `-${x * tileSize}px -${y * tileSize}px`;
      div.addEventListener('click', () => tryMove(i));
    }
    container.appendChild(div);
  });
}

function tryMove(index) {
  const moves = [-1, 1, -size, size];
  for (const move of moves) {
    const target = index + move;
    if (
      target >= 0 &&
      target < tiles.length &&
      tiles[target] === null &&
      Math.abs(target % size - index % size) + Math.abs(Math.floor(target / size) - Math.floor(index / size)) === 1
    ) {
      [tiles[index], tiles[target]] = [tiles[target], tiles[index]];
      render();
      if (!startTime) startTimer();
      if (isSolved()) endGame(true);
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

function startTimer() {
  startTime = Date.now();
  const timerDisplay = document.getElementById('timer');
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = 120 - elapsed;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    } else {
      timerDisplay.textContent = `⏳ Time left: ${remaining}s`;
    }
  }, 1000);
}

function endGame(won) {
  clearInterval(timerInterval);
  const timerDisplay = document.getElementById('timer');
  if (won) {
    timerDisplay.textContent = '🎉 You solved it! Use code SLIDER10 at checkout.';
  } else {
    timerDisplay.textContent = '⏱️ Time's up! Better luck next time.';
  }
}

function init() {
  tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i));
  shuffle(tiles);
  render();
}

window.addEventListener('resize', render);
init();