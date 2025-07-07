document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('puzzle-container');
  const imageUrl = 'https://cdn.shopify.com/s/files/1/0749/1351/3694/files/IMG_4747.jpg';
  const size = 3;
  let tiles = [];

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
        div.style.backgroundImage = `url(${imageUrl})`;
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
        render();
        if (isSolved()) setTimeout(showCongrats, 300);
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

  function showCongrats() {
    alert("🎉 You did it! Here's a secret code: SLIDER10");
  }

  function init() {
    tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i));
    shuffle(tiles);
    render();
  }

  init();
});
