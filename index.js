let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let score = 0;
$start.addEventListener("click", startGame);
$game.addEventListener("click", boxClick);

function startGame() {
  $game.style.backgroundColor = "#fff";
  $start.classList.add("hide");
  renderBox();
}

function boxClick(event) {
  if (event.target.dataset.box) {
    // проверяет наличие box по клику
    score++;
    renderBox();
  }
}

function renderBox() {
  let box = document.createElement("div");
  $game.innerHTML = "";
  box.style.height = box.style.width = "50px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.top = "50px";
  box.style.left = "70px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", true); // атрибут для поиска
  $game.insertAdjacentElement("afterbegin", box); // добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.
}
