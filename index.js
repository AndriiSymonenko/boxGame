let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $gameTime = document.querySelector("#game-time");
let score = 0;

let colors = ["red", "blue", "yellow", "pink"];

let isGameStarted = false;
$start.addEventListener("click", startGame);
$game.addEventListener("click", boxClick);
$gameTime.addEventListener("input", setTimeGame);

function showElem($elem) {
  $elem.classList.remove("hide");
}

function hideElem($elem) {
  $elem.classList.add("hide");
}

function startGame($elem) {
  score = 0;
  $gameTime.setAttribute("disabled", "true");
  setTimeGame();
  isGameStarted = true;
  $game.style.backgroundColor = "#fff";
  hideElem($start);

  let interval = setInterval(function() {
    // таймер
    let time = parseFloat($time.textContent); // Позволяет задавать или получать текстовое содержимое элемента и его потомков.

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function getScore() {
  $result.textContent = score.toString();
}

function setTimeGame() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  showElem($timeHeader);
  hideElem($resultHeader);
}

function endGame() {
  isGameStarted = false;
  getScore();
  $gameTime.removeAttribute("disabled");
  showElem($start);
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = "";
  hideElem($timeHeader);
  showElem($resultHeader);
}

function boxClick(event) {
  if (!isGameStarted) {
    return; // выход из функцмм по окончанию времени игры
  }
  if (event.target.dataset.box) {
    // проверяет наличие box по клику
    score++;
    renderBox();
  }
}

function renderBox() {
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect(); //объект с размерами
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  $game.innerHTML = "";
  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  let randomColor = getRandom(0, colors.length);
  box.style.backgroundColor = colors[randomColor];
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", true); // атрибут для поиска
  $game.insertAdjacentElement("afterbegin", box); // добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
