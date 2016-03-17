import inherit from 'inherit';
import Game from 'game';
import Picture from 'picture';

function GameImaginariumMult() {
  this.name = 'Имаджинариум Союзмультфильм';
  this.minimalValue = 1;
  this.loopSize = 30;
  this.containsStateImages = true;
  this._editableValues = false;

  this.pictures = [
    new Picture('./img/imaginarium-mult-goldfish.png', 'Ассоциация загадывается в виде желания (Хочу, чтобы...)'),
    new Picture('./img/imaginarium-mult-ia.png', 'Ассоциация должна быть грустной.'),
    new Picture('./img/imaginarium-mult-kesha.png', 'Каждое слово в ассоциации повторяется два раза.'),
    new Picture('./img/imaginarium-mult-shchuka.png', 'Ассоциация должна начинаться с "По щучьему велению".')
  ];
}

inherit(GameImaginariumMult, Game);

/**
 * Возвращает изображение, соответствующее текущему значению счёта
 * @param   {Countr}  countr - счётчик, который проверяем
 * @returns {Picture} Изображение, соответствующее текущему значению счёта
 */
GameImaginariumMult.prototype.getStateImage = function(countr) {
  if (countr) {
    switch(countr.getValue()) {
      case 10:
      case 16:
      case 28: return this.pictures[0]; // goldfish

      case 6:
      case 18:
      case 22: return this.pictures[1]; // ia

      case 4:
      case 13:
      case 24: return this.pictures[2]; // kesha

      case 8:
      case 21:
      case 26: return this.pictures[3]; // shchuka

      default: return this._blankStateImage;
    }
  }
  return this._blankStateImage;
};

export default GameImaginariumMult;
