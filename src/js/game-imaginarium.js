import inherit from 'inherit';
import Game from 'game';
import Picture from 'picture';

/**
 * Создает игру Имаджинариум
 * @constructor
 */
function GameImaginarium() {
  this.name = 'Имаджинариум';
  this.minimalValue = 1;
  this.loopSize = 39;
  this.containsStateImages = true;
  this._editableValues = false;

  this.pictures = [
    new Picture('./img/imaginarium-4.png', 'Сформулируй ассоциацию из четырёх слов.'),
    new Picture('./img/imaginarium-question.png', 'Сформулируй ассоциацию в форме вопроса.'),
    new Picture('./img/imaginarium-book.png', 'Сформулируй ассоциацию в форме небольшого рассказа.'),
    new Picture('./img/imaginarium-brand.png', 'Сформулируй ассоциацию с упоминанием известного бренда.'),
    new Picture('./img/imaginarium-tv.png', 'Сформулируй ассоциацию с упоминанием фильма или сериала.')
  ];

}

inherit(GameImaginarium, Game);

/**
 * Проверка текущего значения счёта и поправка его на круговое значение
 * @param   {number} curLoop  текущий круг
 * @param   {number} newValue новое значение счёта
 * @returns {object} объект с новым значением круга и скорректированным значением счёта
 */
GameImaginarium.prototype.validateValue = function(curLoop, newValue) {

  if (newValue < this.minimalValue) {
    curLoop--;
    newValue = this.loopSize;
  } else if (newValue > this.loopSize) {
    curLoop++;
    newValue = this.minimalValue;
  }
/*
  if (newValue > this.loopSize) {
    curLoop = Math.floor(newValue / this.loopSize);
    newValue %= this.loopSize;
  } else if (newValue < this.minimalValue) {
    curLoop = Math.floor((newValue - this.minimalValue) / this.loopSize);
    if (newValue === 0) {
      newValue = this.loopSize;
    } else {
      newValue = Math.abs(newValue) % this.loopSize;
    }
  }
*/

  return {
    'newValue': newValue,
    'newLoop': curLoop
  };
};

/**
 * Возвращает изображение, соответствующее текущему значению счёта
 * @param   {Countr}  countr - счётчик, который проверяем
 * @returns {Picture} Изображение, соответствующее текущему значению счёта
 */
GameImaginarium.prototype.getStateImage = function(countr) {
  if (countr) {
    switch(countr.getValue()) {
      case 3:
      case 18:
      case 25:
      case 28: return this.pictures[0]; // 4

      case 5:
      case 21:
      case 31:
      case 38: return this.pictures[1]; // tv

      case 6:
      case 10:
      case 17:
      case 26: return this.pictures[2]; // question

      case 8:
      case 15:
      case 19:
      case 32: return this.pictures[3]; // book

      case 12:
      case 23:
      case 29:
      case 35: return this.pictures[4]; // brand

      default: return this._blankStateImage;
    }
  }
  return this._blankStateImage;
};

export default GameImaginarium;
