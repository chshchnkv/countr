import inherit from 'inherit';
import Game from 'game';

function GameImaginarium() {
  this.name = 'Имаджинариум';
  this.minimalValue = 1;
  this.loopSize = 39;

  this.pictures = {
    'fourWords': './img/imaginarium-4.png',
    'question': './img/imaginarium-question.png',
    'book': './img/imaginarium-book.png',
    'brand': './img/imaginarium-brand.png',
    'tv': './img/imaginarium-tv.png'
  };
}

inherit(GameImaginarium, Game);

GameImaginarium.prototype.validateValue = function(countr, value) {
  if (countr) {
    let curLoop = countr.loop;
    let newValue = value;

    if (newValue < this.minimalValue) {
      curLoop--;
      newValue = this.loopSize - value;
    } else if (newValue > this.loopSize) {
      curLoop++;
    }

    countr.value = newValue % (this.loopSize + this.minimalValue);
    countr.loop = curLoop;
  }
};

GameImaginarium.prototype.getStateImageSrc = function(countr) {
  if (countr) {
    switch(countr.value) {
      case 3:
      case 18:
      case 25:
      case 28: return this.pictures.fourWords; // 4

      case 5:
      case 21:
      case 31:
      case 38: return this.pictures.tv; // tv

      case 6:
      case 10:
      case 17:
      case 26: return this.pictures.question; // question

      case 8:
      case 15:
      case 19:
      case 32: return this.pictures.book; // book

      case 12:
      case 23:
      case 29:
      case 35: return this.pictures.brand; // brand

      default: return './img/blank.png';
    }
  }
  return '';
};

export default GameImaginarium;
