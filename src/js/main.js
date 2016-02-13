'use strict';
(function(gl) {
  var gamesList = new gl.Games();
  gamesList.render();
  var countrsList = new gl.Countrs(gamesList);

  var header = document.querySelector('.countr-header');
  var addCounter = document.querySelector('.countr-header__add');
  var resetCounters = document.querySelector('.countr-header__reset');

  /// Сброс всех счётчиков в исходное состояние для текущей выбранной игры
  resetCounters.addEventListener('tap', function() {
    countrsList.reset();
  });

  /// добавление нового счётчика
  addCounter.addEventListener('tap', function() {
    countrsList.add();
  });

  /// отображение списка доступных игр
  header.addEventListener('tap', function(event) {
    if (event.target.classList.contains('countr-header__title')) {
      gamesList.toggle();
    }
  });

  /// покрутка списка приводит к появлению тени у заголовка
  var scrollTimeOut;
  gl.addEventListener('scroll', function() {
    clearTimeout(scrollTimeOut);
    scrollTimeOut = setTimeout(function() {
      if (gl.pageYOffset > 0) {
        if (!header.classList.contains('countr-header--shadow')) {
          header.classList.add('countr-header--shadow');
        }
      } else {
        header.classList.remove('countr-header--shadow');
      }
    }, 100);
  });

})(window);
