import EventDispatcher from 'event-dispatcher';
import {getSign} from 'helpers';

/**
* Данные счётчика
* @constructor
* @param {string} name - Наименование счётчика на момент создания
* @param {number} initValue - Начальное значение счётчика
* @param {Games} games - Коллекция доступных игр
*/
function CountrData(name, games) {
  this._name = name;
  this._games = games;

  let min = this.getActiveGame().minimalValue;
  this._value = isFinite(min) ? min : 0;

  this.events = new EventDispatcher();
}

/**
* Имя счётчика
* @type {string}
*/
CountrData.prototype._name = '';

/**
* Значение счётчика
* @type {number}
*/
CountrData.prototype._value = 0;

/**
* Номер круга, если у игры конечное число состояний и возможен уход на новый круг
* @type {number}
*/
CountrData.prototype.loop = 0;

/**
* Изменить значение счетчика на указанное число
* @param {number} [value=1] - число шагов на которое нужно изменить значение, по умолчанию 1
*/
CountrData.prototype.changeValue = function(value) {
  this.setValue(this._value + (value || 1));
};

/**
* Установить новое значение счётчика
* @param {number} newValue - новое значение
* @param {boolean} [skipValidation=false] - выполнить проверку значения через текущую игру
*/
CountrData.prototype.setValue = function(newValue, skipValidation) {
  var game = this.getActiveGame();
  if (game && !skipValidation) {
    let validatedValues = game.validateValue(this.loop, newValue);
    this._value = validatedValues.newValue;
    this.loop = validatedValues.newLoop;
  } else {
    this._value = newValue;
  }
  this.events._fireEvent('ValueChange', newValue);
};

/**
* Получить значение счётчика
*/
CountrData.prototype.getValue = function() {
  return this._value;
};

/**
* Сбросить значение счётчика
*/
CountrData.prototype.resetValue = function() {
  let game = this.getActiveGame();
  let curValue = this._value;
  let newValue = isFinite(game.minimalValue) ? game.minimalValue : 0;
  this.loop = 0;

  if (curValue !== newValue) {
    const TIMES = 10;
    const TOTAL_RESET_TIME = 1000;
    let step = this._getStep(curValue, newValue, TIMES);

    let intervalTimerForReset = setInterval(() => {
      curValue = Math.floor(curValue + step);
      this.setValue(curValue, true);

      if (Math.abs(curValue - newValue) <= Math.abs(step)) {
        clearInterval(intervalTimerForReset);
        this.setValue(newValue, true);
      }

    }, TOTAL_RESET_TIME / TIMES);
  }
};

/**
* Получение шага, с которым будет сбрасываться значение счётчика
*/
CountrData.prototype._getStep = function(from, to, intervals) {
  var sign = getSign(to - from);
  var step = Math.ceil((to - from) / intervals);
  if (step === 0) {
    step = sign;
  }
  return step;
};

/**
* Имя счётчика
*/
CountrData.prototype.getName = function() {
  return this._name;
};

/**
* Имя счётчика
*/
CountrData.prototype.setName = function(newName) {
  this._name = newName;
  this.events._fireEvent('NameChange', newName);
};

/**
* Наименование круга в текущей игре
*/
CountrData.prototype.getLoopName = function() {
  return (this.getActiveGame().loopSize > 0) ? `(круг: ${this.loop})` : '';
};

/**
* Получить текущую активную игру
*/
CountrData.prototype.getActiveGame = function() {
  return this._games.getActiveGame();
};

/**
* Получить ссылку на изображение, соответствующее текущему значению счётчика в контексте текущей игры
*/
CountrData.prototype.getStateImage = function() {
  return this.getActiveGame().getStateImage(this);
};

export default CountrData;
