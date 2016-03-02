import getElementFromTemplate from 'templates';
import {setTextContent} from 'helpers';
import Editor from 'input-editor';

const SPEED = 100;
/**
* @constructor
* @param {string} name - имя счётчика
* @param {number} initValue - начальное значение счётчика
* @param {Countrs} parent - группа счётчиков
*/
function Countr(name, initValue, parent) {
  this.name = name;
  this.value = initValue;
  this._parent = parent;
  this._speed = SPEED;
  this._timerForDetectingLongPress = 0;
  this._timerForIntervalChangingCountr = 0;

  this._onTap = this._onTap.bind(this);
  this._onLongTap = this._onLongTap.bind(this);
  this._onLongTapEnd = this._onLongTapEnd.bind(this);
  this._onDelete = this._onDelete.bind(this);
  this._onHeaderTap = this._onHeaderTap.bind(this);
  this._onHeaderEditorChange = this._onHeaderEditorChange.bind(this);
}

Countr.prototype.loop = 0;

Countr.prototype.render = function() {
  this.element = getElementFromTemplate('countr');
  /// определение нового цвета таким образом, чтобы он не совпадал с предыдущим
  function getCountrColor() {
    return Math.floor(Math.random() * 20 + 1);
  }

  this.element.classList.add('color-' + getCountrColor());

  this._valueElement = this.element.querySelector('.countr__value');
  this._subElement = this.element.querySelector('.countr__sub');
  this._addElement = this.element.querySelector('.countr__add');
  this._deleteElement = this.element.querySelector('.countr__delete');

  this._headerElement = this.element.querySelector('.countr__header');
  this._headerElementEditor = this.element.querySelector('.countr__header-editor');
  this._headerEditor = new Editor(this._headerElementEditor, this.name);

  this._addElement.addEventListener('click', this._onTap);
  this._subElement.addEventListener('click', this._onTap);

  this._addElement.addEventListener('mousedown', this._onLongTap);
  this._subElement.addEventListener('mousedown', this._onLongTap);

  this._addElement.addEventListener('mouseup', this._onLongTapEnd);
  this._subElement.addEventListener('mouseup', this._onLongTapEnd);

  this._deleteElement.addEventListener('click', this._onDelete);

  this._headerElement.addEventListener('click', this._onHeaderTap);
  this._headerElementEditor.addEventListener('change', this._onHeaderEditorChange);

  this._update();

  return this.element;
};

Countr.prototype._update = function() {
  let loopName = (this._getActiveGame().loopSize > 0) ? `(круг: ${this.loop})` : '';

  setTextContent(this._headerElement, `${this.name} ${loopName}`);
  setTextContent(this._valueElement, this.value);
};

Countr.prototype.change = function(value) {
  this.set(this.value + (value || 1));
};

Countr.prototype.set = function(newValue, skipValidation) {
  var game = this._getActiveGame();
  if (game && !skipValidation) {
    game.validateValue(this, newValue);
  } else {
    this.value = newValue;
  }
  this._update();
};

Countr.prototype.reset = function() {
  var game = this._getActiveGame();
  var curValue = this.value;
  var newValue = isFinite(game.minimalValue) ? game.minimalValue : 0;
  this.loop = 0;

  if (curValue !== newValue) {
    var TIMES = 10;
    var TOTAL_RESET_TIME = 1000;
    var step = this._getStep(curValue, newValue, TIMES);

    var intervalTimerForReset = setInterval(() => {
      curValue = Math.floor(curValue + step);
      this.set(curValue, true);

      if (Math.abs(curValue - newValue) <= Math.abs(step)) {
        clearInterval(intervalTimerForReset);
        this.set(newValue, true);
      }

    }, TOTAL_RESET_TIME / TIMES);
  } else {
    this._update();
  }
};

Countr.prototype._getActiveGame = function() {
  return this._parent._getCurrentGame();
};

Countr.prototype.editName = function() {
  this._headerEditor.show();
};

Countr.prototype._getSign = function(number) {
  var sign = 0;
  if (number) {
    sign = number < 0 ? -1 : 1;
  }
  return sign;
};

Countr.prototype._getStep = function(from, to, intervals) {
  var sign = this._getSign(to - from);
  var step = Math.ceil((to - from) / intervals);
  if (step === 0) {
    step = sign;
  }
  return step;
};

Countr.prototype.delete = function() {
  this._addElement.removeEventListener('click', this._onTap);
  this._subElement.removeEventListener('click', this._onTap);

  this._addElement.removeEventListener('mousedown', this._onLongTap);
  this._subElement.removeEventListener('mousedown', this._onLongTap);

  this._addElement.removeEventListener('mouseup', this._onLongTapEnd);
  this._subElement.removeEventListener('mouseup', this._onLongTapEnd);

  this._deleteElement.removeEventListener('click', this._onDelete);
  this._headerElement.removeEventListener('click', this._onHeaderTap);
  this._headerElementEditor.removeEventListener('change', this._onHeaderEditorChange);

  this._headerEditor = null;

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

Countr.prototype._onHeaderTap = function() {
  this._headerEditor.show();
};

Countr.prototype._onHeaderEditorChange = function(event) {
  this.name = event.detail;
  this._update();
};

export default Countr;
