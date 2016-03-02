import EventDispatcher from 'event-dispatcher';
import getElementFromTemplate from 'templates';
import {setTextContent, getRandomColorIndex} from 'helpers';
import Editor from 'input-editor';

const SPEED = 100;
/**
* @constructor
* @param {CountrData} данные счётчика
*/
function Countr(countrData) {
  this._data = countrData;
  this._data.events.addSubscriber(this);

  this._speed = SPEED;
  this._timerForDetectingLongPress = 0;
  this._timerForIntervalChangingCountr = 0;

  this._onTap = this._onTap.bind(this);
  this._onLongTap = this._onLongTap.bind(this);
  this._onLongTapEnd = this._onLongTapEnd.bind(this);
  this._onDelete = this._onDelete.bind(this);
  this._onHeaderTap = this._onHeaderTap.bind(this);
  this._onHeaderEditorChange = this._onHeaderEditorChange.bind(this);

  this.events = new EventDispatcher();
}

/**
* Обработчик события на смену значения в модели данных счётчика
* @param {number} newValue - Новое значение в модели данных
* @private
*/
Countr.prototype._onValueChange = function() {
  this.update();
};

/**
* Обработчик события на смену наименования в модели данных счётчика
* @param {string} newName - Новое наименование в модели данных
* @private
*/
Countr.prototype._onNameChange = function(newName) {
  /// исползуем такой подход, потому что меняется только статичная часть имени
  setTextContent(this._headerElement, `${newName} ${this._data.getLoopName()}`);
};


/**
* Отрисовка счётчика
*/
Countr.prototype.render = function() {
  this.element = getElementFromTemplate('countr');
  this.element.classList.add('color-' + getRandomColorIndex());

  this._headerElement = this.element.querySelector('.countr__header');
  this._valueElement = this.element.querySelector('.countr__value');

  this._deleteElement = this.element.querySelector('.countr__delete');
  this._subElement = this.element.querySelector('.countr__sub');
  this._addElement = this.element.querySelector('.countr__add');
  this._stateImage = this.element.querySelector('.countr__state-image>img');

  this._headerElementEditor = this.element.querySelector('.countr__header-editor');

  this._addElement.addEventListener('click', this._onTap);
  this._subElement.addEventListener('click', this._onTap);

  this._addElement.addEventListener('mousedown', this._onLongTap);
  this._subElement.addEventListener('mousedown', this._onLongTap);

  this._addElement.addEventListener('mouseup', this._onLongTapEnd);
  this._subElement.addEventListener('mouseup', this._onLongTapEnd);

  this._deleteElement.addEventListener('click', this._onDelete);

  this._headerElement.addEventListener('click', this._onHeaderTap);
  this._headerElementEditor.addEventListener('changevalue', this._onHeaderEditorChange);

  this.update();

  return this.element;
};

/**
* Обновить счётчик на экране из модели данных
*/
Countr.prototype.update = function() {
  setTextContent(this._headerElement, `${this._data.getName()} ${this._data.getLoopName()}`);
  setTextContent(this._valueElement, this._data.getValue());
  this._stateImage.src = this._data.getStateImageSrc();
};

/**
* Запустить процесс изменения наименования счётчика
*/
Countr.prototype.editName = function() {
  this._headerEditor = new Editor(this._headerElementEditor, this._data.getName());
  this._headerEditor.show();
};

/**
* Удалить счётчик с экрана
*/
Countr.prototype.delete = function() {
  this.events._fireEvent('DeleteCountr', this);

  this._addElement.removeEventListener('click', this._onTap);
  this._subElement.removeEventListener('click', this._onTap);

  this._addElement.removeEventListener('mousedown', this._onLongTap);
  this._subElement.removeEventListener('mousedown', this._onLongTap);

  this._addElement.removeEventListener('mouseup', this._onLongTapEnd);
  this._subElement.removeEventListener('mouseup', this._onLongTapEnd);

  this._deleteElement.removeEventListener('click', this._onDelete);
  this._headerElement.removeEventListener('click', this._onHeaderTap);
  this._headerElementEditor.removeEventListener('change', this._onHeaderEditorChange);

  this._data = null;
  this._headerEditor = null;

  this.element.parentElement.removeChild(this.element);

};

/**
* Обработчик щелчков по - и +
* @listens click
* @private
*/
Countr.prototype._onTap = function(event) {
  event.preventDefault();
  if (event.target === this._addElement) {
    this._data.changeValue(1);
  } else if (event.target === this._subElement) {
    this._data.changeValue(-1);
  }
};

/**
* Обработчик длинных щелчков по - и +
* @listens mousedown
* @private
*/
Countr.prototype._onLongTap = function(event) {
  event.preventDefault();

  if (event.target === this._addElement) {
    this._longPressButtonStart(1);
  } else if (event.target === this._subElement) {
    this._longPressButtonStart(-1);
  }
};

/**
* Запуск обработчика длинного щелчка
* @param {number} step - шаг изменения счётчика
* @private
*/
Countr.prototype._longPressButtonStart = function(step) {
  this._timerForDetectingLongPress = setInterval(() => {
    clearInterval(this._timerForIntervalChangingCountr);
    this._speed /= 1.1;
    this._timerForIntervalChangingCountr = setInterval(() => {
      this._data.changeValue(step);
    }, this._speed);
  }, 500);
};

/**
* Завершение длинного щелчка
* @listens mouseup
* @private
*/
Countr.prototype._onLongTapEnd = function() {
  clearInterval(this._timerForIntervalChangingCountr);
  clearTimeout(this._timerForDetectingLongPress);
  this._speed = SPEED;
};

/**
* Обработчик щелчка по кнопке Удалить
* @listens click
* @private
*/
Countr.prototype._onDelete = function() {
  this.delete();
};

/**
* Обработчик щелчка по заголовку счётчика
* @listens click
* @private
*/
Countr.prototype._onHeaderTap = function() {
  this.editName();
};

/**
* Обработчик изменения данных в редакторе
* @param {Event} event - данные о событии
* @listens change
* @private
*/
Countr.prototype._onHeaderEditorChange = function(event) {
  this._headerEditor = null;
  this._data.setName(event.detail);
};

export default Countr;
