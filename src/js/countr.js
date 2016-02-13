'use strict';

(function(gl) {

  var SPEED = 100;
  function Countr(name, game, parent) {
    this.name = name;
    this.value = game.initialValue();
    this._parent = parent;
    this._speed = SPEED;
    this._timerForDetectingLongPress = 0;
    this._timerForIntervalChangingCountr = 0;

    this._onTap = this._onTap.bind(this);
    this._onLongTap = this._onLongTap.bind(this);
    this._onLongTapEnd = this._onLongTapEnd.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  Countr.prototype.render = function() {
    this.element = gl.getElementFromTemplate('countr');
    /// определение нового цвета таким образом, чтобы он не совпадал с предыдущим
    function getCountrColor() {
      return Math.floor(Math.random() * 20 + 1);
    }

    this.element.classList.add('color-' + getCountrColor());

    this._valueElement = this.element.querySelector('.countr__value');
    this._subElement = this.element.querySelector('.countr__sub');
    this._addElement = this.element.querySelector('.countr__add');
    this._headerElement = this.element.querySelector('.countr__header');
    this._deleteElement = this.element.querySelector('.countr__delete');

    this._valueElement.textContent = this.value;
    this._headerElement.textContent = this.name;

    this._addElement.addEventListener('tap', this._onTap);
    this._subElement.addEventListener('tap', this._onTap);

    this._addElement.addEventListener('mousedown', this._onLongTap);
    this._subElement.addEventListener('mousedown', this._onLongTap);

    this._addElement.addEventListener('mouseup', this._onLongTapEnd);
    this._subElement.addEventListener('mouseup', this._onLongTapEnd);

    this._deleteElement.addEventListener('tap', this._onDelete);

    return this.element;
  };

  Countr.prototype._updateValue = function() {
    this._valueElement.textContent = this.value;
  };

  Countr.prototype.change = function(value) {
    this.set(this.value + (value || 1));
  };

  Countr.prototype.set = function(newValue) {
    var game = this._parent._getCurrentGame();
    if (game) {
      if (game.isValidValue(newValue)) {
        this.value = newValue;
      }
    } else {
      this.value = newValue;
    }
    this._updateValue();
  };

  Countr.prototype.reset = function() {
    var game = this._parent._getCurrentGame();
    var curValue = this.value;
    var newValue = isFinite(game.minimalValue) ? game.minimalValue : 0;

    if (curValue !== newValue) {
      var TIMES = 100;
      var TOTAL_RESET_TIME = 1000;
      var step = (newValue - curValue) / TIMES;

      var intervalTimerForReset = setInterval(function() {
        curValue = Math.floor(curValue + step);
        this.set(curValue);

        if (Math.abs(curValue - newValue) <= Math.abs(step)) {
          clearInterval(intervalTimerForReset);
          this.set(newValue);
        }
      }.bind(this), TOTAL_RESET_TIME / TIMES);
    }
  };

  Countr.prototype.delete = function() {
    this.element.parentElement.removeChild(this.element);
    this._parent.delete(this);
  };

  Countr.prototype._onTap = function(event) {
    event.preventDefault();
    if (event.target === this._addElement) {
      this.change(1);
    } else if (event.target === this._subElement) {
      this.change(-1);
    }
  };

  Countr.prototype._onLongTap = function(event) {
    event.preventDefault();

    if (event.target === this._addElement) {
      this._longPressButtonStart(1);
    } else if (event.target === this._subElement) {
      this._longPressButtonStart(-1);
    }
  };

  Countr.prototype._longPressButtonStart = function(step) {
    this._timerForDetectingLongPress = setInterval(function() {
      clearInterval(this._timerForIntervalChangingCountr);
      this._speed /= 1.1;
      this._timerForIntervalChangingCountr = setInterval(function() {
        this.change(step);
      }.bind(this), this._speed);
    }.bind(this), 500);
  };

  Countr.prototype._onLongTapEnd = function() {
    clearInterval(this._timerForIntervalChangingCountr);
    clearTimeout(this._timerForDetectingLongPress);
    this._speed = SPEED;
  };

  Countr.prototype._onDelete = function() {
    this.delete();
  };

  gl.Countr = Countr;
})(window);
