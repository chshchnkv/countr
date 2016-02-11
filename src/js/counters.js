'use strict';
(function(gl) {
  var countersContainer = document.querySelector('.countr-container');
  var header = document.querySelector('.countr-header');
  var addCounter = document.querySelector('.countr-header__add');
  var resetCounters = document.querySelector('.countr-header__reset');

  var allCounters = [];

  resetCounters.addEventListener('tap', function() {
    allCounters.forEach(function(countr) {
      countr.reset();
    });
  });

  addCounter.addEventListener('tap', function() {
    var countrName = gl.prompt('Название счётчика', 'Счётчик ' + (+allCounters.length + 1));
    var newCountr = new gl.Countr(countrName, 1);
    allCounters.push(newCountr);
    countersContainer.appendChild(getCountrElementFromTemplate(newCountr));
  });

  header.addEventListener('tap', function(event) {
    if (event.target.classList.contains('countr-header__title')) {
      var games = header.querySelector('.countr-header__games');
      games.classList.toggle('hidden');
    }
  });

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

  function getCountrElementFromTemplate(countr) {
    var element = gl.getElementFromTemplate('countr');
    countr.element = element;

    element.classList.add('color-' + Math.floor(Math.random() * 20 + 1));
    element.querySelector('.countr__value').textContent = countr.value;
    element.querySelector('.countr__header').textContent = countr.name;
    var timerLongPress;
    var handlingLongPress = false;
    element.addEventListener('mousedown', function(event) {
      var clickedElement = event.target;
      var step = 0;
      if (clickedElement.classList.contains('countr__sub') || clickedElement.classList.contains('fa-minus')) {
        handlingLongPress = true;
        step = -1;
        timerLongPress = setTimeout(function() {
          setTimeout(onTimer, 50);
        }, 500);
      } else if (clickedElement.classList.contains('countr__add') || clickedElement.classList.contains('fa-plus')) {
        handlingLongPress = true;
        step = 1;
        timerLongPress = setTimeout(function() {
          setTimeout(onTimer, 50);
        }, 500);

      }

      function onTimer() {
        countr.change(step);
        if (handlingLongPress) {
          setTimeout(onTimer, 50);
        }
      }

    });
    element.addEventListener('mouseup', function() {
      clearTimeout(timerLongPress);
      handlingLongPress = false;
    });
    element.addEventListener('tap', function(event) {
      var clickedElement = event.target;

      if (clickedElement.classList.contains('countr__sub') || clickedElement.classList.contains('fa-minus')) {
        countr.change(-1);
      } else if (clickedElement.classList.contains('countr__add') || clickedElement.classList.contains('fa-plus')) {
        countr.change(1);
      } else if (clickedElement.classList.contains('countr__delete') || clickedElement.classList.contains('fa-times')) {
        allCounters.splice(allCounters.indexOf(countr), 1);
        countersContainer.removeChild(element);
      }
    });
    return element;
  }
})(window);
