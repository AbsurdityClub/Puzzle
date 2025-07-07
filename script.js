document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("puzzle-container");
  const message = document.getElementById("message");
  const imageUrl = "IMG_4750.jpg";
  const size = 3;
  let tiles = [];
  let emptyIndex = size * size - 1;
  let tileSize;
  let timerStarted = false;
  let timer;
  let timeLimit = 120000; // 2 minutes

  function shuffle(array) {
    for (let i = array.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function render() {
    container.innerHTML = "";
    tileSize = container.offsetWidth / size;

    tiles.forEach((tile, i) => {
      const div = document.createElement("div");
      div.className = "tile";
      div.style.width = div.style.height = tileSize + "px";

      if (tile === null) {
        div.classList.add("empty");
      } else {
        const x = tile % size;
        const y = Math.floor(tile / size);
        div.style.backgroundImage = `url(${imageUrl})`;
        div.style.backgroundPosition = `-${x * tileSize}px -${y * tileSize}px`;
        div.draggable = true;

        div.addEventListener("dragstart", e => {
          e.dataTransfer.setData("text/plain", i);
        });

        div.addEventListener("dragover", e => {
          e.preventDefault();
        });

        div.addEventListener("drop", e => {
          const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
          const toIndex = i;
          if (isAdjacent(fromIndex, toIndex) && tiles[toIndex] === null) {
            [tiles[fromIndex], tiles[toIndex]] = [tiles[toIndex], tiles[fromIndex]];
            render();
            if (!timerStarted) startTimer();
            if (isSolved()) handleWin();
          }
        });
      }

      container.appendChild(div);
    });
  }

  function isAdjacent(i, j) {
    const dx = Math.abs((i % size) - (j % size));
    const dy = Math.abs(Math.floor(i / size) - Math.floor(j / size));
    return dx + dy === 1;
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
      message.textContent = "⏳ Time's up! Better luck next time.";
    }, timeLimit);
  }

  function handleWin() {
    clearTimeout(timer);
    message.textContent = "🎉 You did it! Use code SLIDER10 for 10% off.";
  }

  function init() {
    tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i));
    shuffle(tiles);
    render();
  }

  window.addEventListener("resize", render);
  init();
});
