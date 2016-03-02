import Games from'games';
import Countrs from 'countrs';

var gamesList = new Games();
gamesList.render();
gamesList.element.addEventListener('change', () => {
  countrsList.reset();
}, true);

var countrsList = new Countrs(gamesList);

var headerTitle = document.querySelector('.countr-header__title');
var addCounter = document.querySelector('.countr-header__add');
var resetCounters = document.querySelector('.countr-header__reset');

/// Сброс всех счётчиков в исходное состояние для текущей выбранной игры
resetCounters.addEventListener('click', onResetCountrs);

/// добавление нового счётчика
addCounter.addEventListener('click', onAddCountr);

/// отображение списка доступных игр
headerTitle.addEventListener('click', onHeaderTitleClick);

/// покрутка списка приводит к появлению тени у заголовка
var scrollTimeOut;
window.addEventListener('scroll', function() {
  clearTimeout(scrollTimeOut);
  scrollTimeOut = setTimeout(function() {
    if (window.pageYOffset > 0) {
      if (!headerTitle.classList.contains('countr-header--shadow')) {
        headerTitle.classList.add('countr-header--shadow');
      }
    } else {
      headerTitle.classList.remove('countr-header--shadow');
    }
  }, 100);
});

function onAddCountr() {
  countrsList.add();
}

function onResetCountrs() {
  countrsList.reset();
}

function onHeaderTitleClick(event) {
  if (event.target.classList.contains('countr-header__title')) {
    gamesList.toggle();
  }
}
