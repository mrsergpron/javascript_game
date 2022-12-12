//получаем доступ к элементам DOM дерева
var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $result = document.querySelector('#result');
var $gameTime = document.querySelector('#game-time');

var isGameStarted = false;

//переменная счета
var score = 0;

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

//ставим прослушку на блок
$game.addEventListener('click', handleBoxClick);

//прослушка импута
$gameTime.addEventListener('input', setGameTime);

//клик по кнопке старт начинает игру
$start.addEventListener('click', startGame);

//функция запуска игры
function startGame() {
  isGameStarted = true;
  score = 0;

  //запуск времени игры
  setGameTime();

  //блокируем ввод input
  $gameTime.setAttribute('disabled', true);

  //прячем кнопку
  hide($start);
  //делаем фон поля белым
  $game.style.backgroundColor = '#fff';

  //создаем таймер счетчика
  var interval = setInterval(function () {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      //конец игре
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  //создаем квадраты
  renderBox();
}

//функция создания квадратов
function renderBox() {
  //функция случайного значения ширины и высоты квадрата
  var boxSize = getRandom(30, 100);

  //функция случайного значения цвета квадрата
  var boxColorR = getRandomColor(0, 254);
  var boxColorG = getRandomColor(0, 254);
  var boxColorB = getRandomColor(0, 254);
  var boxColor =
    'rgb' + '(' + boxColorR + ',' + boxColorG + ',' + boxColorB + ')';
  //получим параметры поля game
  var gameSize = $game.getBoundingClientRect();
  //максимальное отклонение от верха
  var maxTop = gameSize.height - boxSize;
  //максимальное отклонение с лева
  var maxLeft = gameSize.width - boxSize;

  //очищаем содержимое блока game
  $game.innerHTML = '';
  //создаем кавдрат
  var box = document.createElement('div');
  //создаем стили для квадрата
  box.style.height = boxSize + 'px';
  box.style.width = boxSize + 'px';
  box.style.backgroundColor = boxColor;
  box.style.position = 'absolute';
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';

  //метка для считывания клика по блоку box
  box.setAttribute('data-box', true);

  //вставим наш div в блок game
  $game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  //eсли мы кликнули по квадрату
  if (event.target.dataset.box) {
    score++;

    renderBox();
  }
}

//динамические ширина и высота квадрата
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//динамические цвета квадрата
function getRandomColor(min, max) {
  return Math.random() * (max - min) + min;
}

//задать время
function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time;
  //вывод заголовка
  show($timeHeader);
  hide($resultHeader);
}

//результат игры
function setGameScore() {
  $result.textContent = score.toString();
}

//окончание игры
function endGame() {
  isGameStarted = false;
  //разблокируем ввод input
  $gameTime.removeAttribute('disabled');
  //вывод результата игры
  setGameScore();
  //очистим квадраты
  $game.innerHTML = '';
  //покажем кнопку
  show($start);
  //делаем фон поля серым
  $game.style.backgroundColor = '#ccc';
  //вывод результатов
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
}
