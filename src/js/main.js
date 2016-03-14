import Games from'games';
import CountrData from 'countr-data';
import Countr from 'countr';

/**
* Все счётчики приложения
* @type {CountrData[]}
*/
var countrsData = [];

/**
* Отрисованные счётчики
* @type {Countr[]}
*/
var renderedCountrs = [];

/**
* Список доступных игр
* @type {Games}
*/
var gamesList = new Games();
gamesList.render();
gamesList.element.addEventListener('change', _onGameChange);

/**
* Контейнер для отрисованных счётчиков
* @type {HTMLElement}
*/
var countrsContainer = document.querySelector('.countr-container');

/**
* Заголовок приложения
* @type {HTMLElement}
*/
var headerTitleElement = document.querySelector('.countr-header__title');
headerTitleElement.addEventListener('click', _onHeaderClick);

/**
 * Шапка приложения
 */
var headerElement = document.querySelector('.countr-header');

/**
* Кнопка добавления счётчика
* @type {HTMLElement}
*/
var addCountrElement = document.querySelector('.countr-header__add');
addCountrElement.addEventListener('click', _onAddCountr);

/**
* Кнопка сброса счётчиков
* @type {HTMLElement}
*/
var resetCountrsElement = document.querySelector('.countr-header__reset');
resetCountrsElement.addEventListener('click', _onResetCountrs);

/**
* Добавление нового счётчика
*/
var addCountr = function() {
  let newCountrData = new CountrData('Счётчик ' + (+countrsData.length + 1), gamesList);
  countrsData.push(newCountrData);

  let newCountr = new Countr(newCountrData);
  newCountr.events.addSubscriber(window);
  renderedCountrs.push(newCountr);

  countrsContainer.appendChild(newCountr.render());
  newCountr.editName();
};

/**
* Сброс всех счётчиков в минимальное значение
*/
function resetCountrs() {
  countrsData.forEach((item) => {
    item.resetValue();
  });
}

/**
* Обработчик запроса на удаление счётчика
*/
window._onDeleteCountr = function(countr) {
  countrsData.splice(countrsData.indexOf(countr._data), 1);
  renderedCountrs.splice(renderedCountrs.indexOf(countr), 1);
};

function _onGameChange() {
  resetCountrs();
}

function _onHeaderClick() {
  gamesList.toggle();
}

function _onAddCountr() {
  addCountr();
}

function _onResetCountrs() {
  resetCountrs();
}


/// покрутка списка приводит к появлению тени у заголовка
var scrollTimeOut;
window.addEventListener('scroll', function() {
  clearTimeout(scrollTimeOut);
  scrollTimeOut = setTimeout(function() {
    if (window.pageYOffset > 0) {
      if (!headerElement.classList.contains('countr-header--shadow')) {
        headerElement.classList.add('countr-header--shadow');
      }
    } else {
      headerElement.classList.remove('countr-header--shadow');
    }
  }, 100);
});

/**
 * Обработчик клика в окне - нужен чтобы скрывать список игр, например
 */
window.addEventListener('click', (event) => {
  if (!gamesList.element.classList.contains('hidden') &&
     !event.target.classList.contains('countr-header__title')) {
    gamesList.hide();
  }
});
