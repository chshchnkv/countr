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
gamesList.element.addEventListener('change', () => {
  resetCountrs();
});

/**
* Контейнер для отрисованных счётчиков
* @type {HTMLElement}
*/
var countrsContainer = document.querySelector('.countr-container');

/**
* Заголовок приложения
* @type {HTMLElement}
*/
var headerTitle = document.querySelector('.countr-header');
headerTitle.addEventListener('click', (event) => {
  if (event.target.classList.contains('countr-header__title')) {
    gamesList.toggle();
  }
});

/**
* Кнопка добавления счётчика
* @type {HTMLElement}
*/
var addCountrElement = document.querySelector('.countr-header__add');
addCountrElement.addEventListener('click', () => {
  addCountr();
});

/**
* Кнопка сброса счётчиков
* @type {HTMLElement}
*/
var resetCountrsElement = document.querySelector('.countr-header__reset');
resetCountrsElement.addEventListener('click', () => {
  resetCountrs();
});

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
* Обработчик запроса на удаление счётчика
*/
window._onDeleteCountr = function(countr) {
  countrsData.splice(countrsData.indexOf(countr._data), 1);
  renderedCountrs.splice(renderedCountrs.indexOf(countr), 1);
};

/**
* Сброс всех счётчиков в минимальное значение
*/
var resetCountrs = function() {
  countrsData.forEach((item) => {
    item.resetValue();
  });
};

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
