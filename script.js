document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("puzzle-container");
  const message = document.getElementById("message");
  const imageUrl = "IMG_4750.jpg";
  const size = 3;
  let tiles = [];
  let emptyIndex = size * size - 1;
  let timer;
  let timerStarted = false;

  function shuffle(array) {
    for (let i = array.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function isAdjacent(i, j) {
    const dx = Math.abs((i % size) - (j % size));
    const dy = Math.abs(Math.floor(i / size) - Math.floor(j / size));
    return dx + dy === 1;
  }

  function render() {
  container.innerHTML = "";
  const tileSize = container.offsetWidth / size;

  tiles.forEach((tile, i) => {
    const div = document.createElement("div");
    div.className = "tile";

    if (tile === null) {
      div.classList.add("empty");
    } else {
      const x = tile % size;
      const y = Math.floor(tile / size);
      div.style.backgroundImage = `url(${imageUrl})`;
      div.style.backgroundSize = `${tileSize * size}px ${tileSize * size}px`;
      div.style.backgroundPosition = `-${x * tileSize}px -${y * tileSize}px`;
      div.addEventListener("click", () => tryMove(i));
    }

    container.appendChild(div);
  });
}

  function tryMove(i) {
    if (isAdjacent(i, emptyIndex)) {
      [tiles[i], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[i]];
      emptyIndex = i;
      render();
      if (!timerStarted) startTimer();
      if (isSolved()) showWin();
    }
  }

  function isSolved() {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  }

  function startTimer() {
    timerStarted = true;
    timer = setTimeout(() => {
      message.textContent = "⏰ Time's up! Better luck next time.";
    }, 2 * 60 * 1000); // 2 minutes
  }

  function showWin() {
    clearTimeout(timer);
    message.textContent = "🎉 You did it! Use code SLIDER10 for 10% off.";
  }

  function init() {
    tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i));
    shuffle(tiles);
    emptyIndex = tiles.indexOf(null);
    timerStarted = false;
    clearTimeout(timer);
    message.textContent = "";
    render();
  }

  init();
});
