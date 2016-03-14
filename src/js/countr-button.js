import inherit from 'inherit';

const SPEED = 100;

/**
 * Кнопка внутри счётчика
 * @param {HTMLElement} element - элемент кнопки в счётчике
 * @param {CountrData}  data    - данные счётчика
 */
function CountrButton(element, data) {
  this.render(element, data);
}

/**
 * Инициализация кнопки
 * @param {HTMLElement} element - элемент кнопки в счётчике
 * @param {CountrData}  data    - данные счётчика
 */
CountrButton.prototype.render = function(element, data) {
  this._onButtonClick = this._onButtonClick.bind(this);
  this._onLongClickStart = this._onLongClickStart.bind(this);
  this._onLongClickEnd = this._onLongClickEnd.bind(this);

  this._data = data;
  this._data.events.addSubscriber(this);

  this.element = element;
  this.element.addEventListener('click', this._onButtonClick);
  this.element.addEventListener('mousedown', this._onLongClickStart);
  this.element.addEventListener('mouseup', this._onLongClickEnd);

  this._speed = SPEED;
  this._timerForDetectingLongPress = 0;
  this._timerForIntervalChangingCountr = 0;
};

/**
 * Удалить кнопку
 */
CountrButton.prototype.remove = function() {
  this.element.removeEventListener('click', this._onButtonClick);
  this.element.removeEventListener('mousedown', this._onLongClickStart);
  this.element.removeEventListener('mouseup', this._onLongClickEnd);

  this._data = null;
  this.element.parentElement.removeChild(this.element);
  this.element = null;
};

/**
 * Изменить значение данных счётчика, переопределяется в наследниках
 */
CountrButton.prototype.change = function() {};

CountrButton.prototype.element = null;
CountrButton.prototype._data = null;
CountrButton.prototype._stop = true;

/**
 * Остановка изменения, если был длинный клик по кнопке
 */
CountrButton.prototype.stop = function() {
  this._stop = true;
};


CountrButton.prototype._onResetValue = function() {
  this.stop();
};

/**
 * Клик по кнопке
 * @param {Event} event - Событие клика
 */
CountrButton.prototype._onButtonClick = function(event) {
  event.preventDefault();
  this._onLongClickEnd();
  this.change();
};

/**
 * Запуск длинного клика по кнопке
 */
CountrButton.prototype._onLongClickStart = function() {
  this._stop = false;

  this._timerForDetectingLongPress = setInterval(() => {
    clearInterval(this._timerForIntervalChangingCountr);

    if (!this._stop) {
      this._speed /= 1.1;
      this._timerForIntervalChangingCountr = setInterval(() => {
        this.change();
      }, this._speed);
    }
  }, SPEED * 5);

};

/**
 * Остановка длинного клика
 */
CountrButton.prototype._onLongClickEnd = function() {
  this.stop();
  clearInterval(this._timerForIntervalChangingCountr);
  clearTimeout(this._timerForDetectingLongPress);
  this._speed = SPEED;
};


/**
 * Кнопка "Минус"
 * @param {HTMLElement} element - элемент кнопки в счётчике
 * @param {CountrData}  data    - данные счётчика
 */
function CountrButtonSub(element, data) {
  this.render(element, data);
}

inherit(CountrButtonSub, CountrButton);

/**
 * Изменение значения, связанное с кнопкой
 */
CountrButtonSub.prototype.change = function() {
  this._data.changeValue(-1);
};



/**
 * Кнопка "Плюс"
 * @param {HTMLElement} element - элемент кнопки в счётчике
 * @param {CountrData}  data    - данные счётчика
 */
function CountrButtonAdd(element, data) {
  this.render(element, data);
}

inherit(CountrButtonAdd, CountrButton);

/**
 * Изменение значения, связанное с кнопкой
 */
CountrButtonAdd.prototype.change = function() {
  this._data.changeValue(1);
};

export {CountrButton, CountrButtonAdd, CountrButtonSub};
