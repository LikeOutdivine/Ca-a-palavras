
const dicionario = ['CASA', 'CARRO', 'ESCOLA', 'FELICIDADE', 'AMOR', 'JANELA', 'PORTA', 'LIVRO', 'FAMILIA', 'COMIDA', 'TRABALHO', 'DIVERSAO', 'ALEGRIA', 'BANANA', 'CIDADE', 'RUA', 'PRAIA', 'SORRISO', 'SONHO', 'AMIGO', 'FUTURO', 'MUNDO', 'NOITE', 'DIA', 'LUZ', 'SABER', 'TEMPO', 'VENTO', 'VOZ', 'VIDA', 'PAZ', 'GUERRA', 'FLORESTA', 'MAR', 'SOL', 'CHUVA', 'ESTRELA', 'FESTA', 'BRINCADEIRA', 'MUSICA', 'CANTAR', 'DANCA', 'NATUREZA', 'BICICLETA', 'CAMINHO', 'ESCADA', 'RELVA', 'ANIMAL', 'FRUTA', 'ABACAXI', 'UVA', 'MANGA', 'LARANJA', 'POMAR', 'CACHORRO', 'GATO', 'PASSARO', 'JARDIM'];
const gridSize = 12;
let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(""));
const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];
let words = [];

while (words.length < 5) {
  const palavra = dicionario[Math.floor(Math.random() * dicionario.length)];
  if (!words.includes(palavra) && palavra.length <= 10) {
    words.push(palavra);
  }
}

function placeWord(word) {
  const dir = directions[Math.floor(Math.random() * directions.length)];
  let x, y, success = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
    let canPlace = true;
    for (let i = 0; i < word.length; i++) {
      let nx = x + dir[0] * i;
      let ny = y + dir[1] * i;
      if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize || 
          (grid[ny][nx] && grid[ny][nx] !== word[i])) {
        canPlace = false;
        break;
      }
    }
    if (canPlace) {
      for (let i = 0; i < word.length; i++) {
        let nx = x + dir[0] * i;
        let ny = y + dir[1] * i;
        grid[ny][nx] = word[i];
      }
      return true;
    }
  }
  return false;
}

function fillGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!grid[y][x]) {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
}

function drawGrid() {
  const gridEl = document.getElementById("grid");
  gridEl.innerHTML = "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = grid[y][x];
      cell.dataset.x = x;
      cell.dataset.y = y;
      gridEl.appendChild(cell);
    }
  }
}

function drawWords() {
  const list = document.getElementById("wordList");
  words.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w;
    li.id = "word-" + w;
    list.appendChild(li);
  });
}

let selected = [];
function handleSelect(cell) {
  const x = parseInt(cell.dataset.x);
  const y = parseInt(cell.dataset.y);
  selected.push([x, y]);
  cell.classList.add("selected");

  if (selected.length >= 2) {
    checkWord();
    clearSelection();
  }
}

function clearSelection() {
  document.querySelectorAll(".cell.selected").forEach(c => c.classList.remove("selected"));
  selected = [];
}

function checkWord() {
  const [start, end] = selected;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const len = Math.max(Math.abs(dx), Math.abs(dy)) + 1;
  const stepX = dx !== 0 ? dx / (len - 1) : 0;
  const stepY = dy !== 0 ? dy / (len - 1) : 0;

  let letters = "";
  let path = [];
  for (let i = 0; i < len; i++) {
    const x = Math.round(start[0] + stepX * i);
    const y = Math.round(start[1] + stepY * i);
    const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    letters += cell.textContent;
    path.push(cell);
  }

  if (words.includes(letters)) {
    path.forEach(c => c.classList.add("found"));
    document.getElementById("word-" + letters).classList.add("found");
  }
}

document.getElementById("grid").addEventListener("click", e => {
  if (e.target.classList.contains("cell")) {
    handleSelect(e.target);
  }
});

words.forEach(w => placeWord(w));
fillGrid();
drawGrid();
drawWords();
