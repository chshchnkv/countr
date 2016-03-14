import EventDispatcher from 'event-dispatcher';
import getElementFromTemplate from 'templates';
import {setTextContent, getRandomColorIndex} from 'helpers';
import Editor from 'input-editor';
import IntEditor from 'input-editor--int';
import {CountrButtonAdd, CountrButtonSub} from 'countr-button';

/**
* @constructor
* @param {CountrData} данные счётчика
*/
function Countr(countrData) {
  this._data = countrData;
  this._data.events.addSubscriber(this);

  this._onDelete = this._onDelete.bind(this);

  this._onHeaderTap = this._onHeaderTap.bind(this);
  this._onHeaderEditorChange = this._onHeaderEditorChange.bind(this);

  this._onValueClick = this._onValueClick.bind(this);
  this._onValueEditorChange = this._onValueEditorChange.bind(this);

  this._onStateImageLinkClick = this._onStateImageLinkClick.bind(this);

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

  this._deleteElement = this.element.querySelector('.countr__delete');
  this._deleteElement.addEventListener('click', this._onDelete);

  this._addBtn = new CountrButtonAdd(this.element.querySelector('.countr__add'), this._data);
  this._subBtn = new CountrButtonSub(this.element.querySelector('.countr__sub'), this._data);

  this._stateImageContainer = this.element.querySelector('.countr__state-image');
  this._stateImageLink = this._stateImageContainer.querySelector('.countr__state-image-link');
  this._stateImageLink.addEventListener('click', this._onStateImageLinkClick);
  this._stateImage = this._stateImageContainer.querySelector('img');
  this._stateImageHelp = this._stateImageContainer.querySelector('.countr__state-image-alt');

  this._headerElement = this.element.querySelector('.countr__header');
  this._headerElement.addEventListener('click', this._onHeaderTap);
  this._headerElementEditor = this.element.querySelector('.countr__header-editor');
  this._headerElementEditor.addEventListener('changevalue', this._onHeaderEditorChange);

  this._valueElement = this.element.querySelector('.countr__value');
  this._valueElement.addEventListener('click', this._onValueClick);
  this._valueElementEditor = this.element.querySelector('.countr__value-editor');
  this._valueElementEditor.addEventListener('changevalue', this._onValueEditorChange);

  this.update();

  return this.element;
};

/**
* Обновить счётчик на экране из модели данных
*/
Countr.prototype.update = function() {
  if (this._data) {
    setTextContent(this._headerElement, `${this._data.getName()} ${this._data.getLoopName()}`);
    setTextContent(this._valueElement, this._data.getValue());
    this._updateStateImages();
  }
};

/**
 * Обновляет изображения для игр с картинками на поле
 */
Countr.prototype._updateStateImages = function() {
  let showImages = this._data.getActiveGame().containsStateImages;

  if (!showImages && !this._stateImageContainer.classList.contains('invisible')) {
    this._stateImageContainer.classList.add('invisible');
  }

  if (showImages) {
    this._stateImageContainer.classList.remove('invisible');
  }

  let picture = this._data.getStateImage().img.cloneNode(true);
  this._stateImage.parentNode.replaceChild(picture, this._stateImage);
  this._stateImage = picture;

  let text = this._data.getStateImage().img.alt;
  this._stateImageHelp.textContent = text;
  if (text === '' && !this._stateImageHelp.classList.contains('hidden')) {
    this._stateImageHelp.classList.add('hidden');
  }

};

/**
* Запустить процесс изменения наименования счётчика
*/
Countr.prototype.editName = function() {
  this._headerEditor = new Editor(this._headerElementEditor, this._data.getName());
  this._headerEditor.show();
};

/**
* Запустить процесс изменения значения в редакторе
*/
Countr.prototype.editValue = function() {
  this._valueEditor = new IntEditor(this._valueElementEditor, this._data.getValue());
  this._valueEditor.show();
};

/**
* Удалить счётчик с экрана
*/
Countr.prototype.delete = function() {
  this.events._fireEvent('DeleteCountr', this);
  this._addBtn.stop();
  this._subBtn.stop();

  this._deleteElement.removeEventListener('click', this._onDelete);
  this._headerElement.removeEventListener('click', this._onHeaderTap);
  this._headerElementEditor.removeEventListener('change', this._onHeaderEditorChange);

  this._valueElement.removeEventListener('click', this._onValueClick);
  this._valueElementEditor.removeEventListener('changevalue', this._onValueEditorChange);

  this._data = null;
  this._headerEditor = null;
  this._addBtn = null;
  this._subBtn = null;

  this.element.parentElement.removeChild(this.element);

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

/**
* Обработка клика по значению счётчика
*/
Countr.prototype._onValueClick = function() {
  if (this._data.getActiveGame()._editableValues) {
    this.editValue();
  }
};

/**
 * Изменение значения счётчика через редактор
 * @param {Event} event - событие с данными
 */
Countr.prototype._onValueEditorChange = function(event) {
  this._valueEditor = null;
  this._data.setValue(parseInt(event.detail, 10));
};

/**
 * Таймер по которому будет убрана подсказка для изображения
 */
Countr.prototype._helpTimer = 0;

/**
 * Время для отображения подсказки
 */
Countr.prototype._helpTime = 10000;

/**
 * При клике на картинку для текущего значения счётчика выдается подсказка
 * @param {Event} event - Событие клика
 */
Countr.prototype._onStateImageLinkClick = function(event) {
  event.preventDefault();
  this._stateImageHelp.classList.toggle('hidden');
  this._helpTimer = setTimeout(() => {
    this._stateImageHelp.classList.add('hidden');
  }, this._helpTime);
};

export default Countr;
