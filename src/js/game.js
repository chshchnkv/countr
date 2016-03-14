import getElementFromTemplate from 'templates';
import {setTextContent} from 'helpers';
import Picture from 'picture';

/**
* Базовый класс для всех игр
* @constructor
* @param {string} name - Название игры
* @param {number} minimalValue - минимальное допустимое значение счёта в игре
*/
function Game(name, minimalValue) {
  this.name = name;
  this.minimalValue = minimalValue;
}

/**
* Начальный счёт игры
*/
Game.prototype.initialValue = function() {
  return isFinite(this.minimalValue) ? this.minimalValue : 0;
};

/**
* Пустое изображение для игр с иконками
* @type {Picture}
*/
Game.prototype._blankStateImage = new Picture('./img/blank.png');

/**
 * Есть ли в игре иконки для конкретных значений на поле
 */
Game.prototype.containsStateImages = false;

/**
 * Для некоторых игр можно запретить редактировать значение счётчиков, то есть изменять можно только нажатием на кнопки + и -
 */
Game.prototype._editableValues = true;

/**
* Размер круга в игре.
* @type {number}
*/
Game.prototype.loopSize = 0;

/**
 * Закончена ли игра
 * @param   {Countr}  countr - счетчик, для которого выполняется проверка
 * @returns {boolean}
 */
Game.prototype.isOver = function(countr) {
  return countr !== null;
};

/**
 * Проверка значения - для круговых игр позволяет зацикливать и увеличивать/уменьшать значение текущего круга в игре
 * @param   {number} curLoop - Текущий круг в игре
 * @param   {number} value   - Текущее значение счёта
 * @returns {object} Объект с новым значением круга и новым значением счёта
 */
Game.prototype.validateValue = function(curLoop, value) {
  return {
    'newValue': value,
    'newLoop': curLoop
  };
};

/**
 * Проверяет валидно ли значение счёта для текущей игры
 * @param   {number}  value - проверяемое значение
 * @returns {boolean}
 */
Game.prototype.isValidValue = function(value) {
  return value >= this.minimalValue;
};

/**
 * Получить изображение на поле игры, которое соответствует указанному значению счёта
 * @returns {Picture}
 */
Game.prototype.getStateImage = function() {
  return this._blankStateImage;
};

/**
 * Рендеринг пункта с игрой в меню
 * @param   {string}      id - Идентификатор с которым игра будет встроена в меню
 * @returns {HTMLElement} DOM-элемент
 */
Game.prototype.render = function(id) {
  this.element = getElementFromTemplate('template-game');
  this._label = this.element.querySelector('label');
  this._radio = this.element.querySelector('input[type="radio"]');

  this._radio.setAttribute('id', id);
  this._label.setAttribute('for', id);

  setTextContent(this._label, this.name);

  return this.element;
};

/**
 * Отметить игру в списке
 */
Game.prototype.check = function() {
  this._radio.setAttribute('checked', 'true');
};

export default Game;
