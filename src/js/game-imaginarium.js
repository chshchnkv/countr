import inherit from 'inherit';
import Game from 'game';

function GameImaginarium() {
  this.name = 'Имаджинариум';
  this.minimalValue = 1;
  this.loopSize = 39;
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

export default GameImaginarium;
