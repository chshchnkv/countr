import inherit from 'inherit';
import Game from 'game';

function Game101() {
  this.name = '101';
  this.minimalValue = -Infinity;
}
inherit(Game101, Game);

Game101.prototype.isOver = function(countr) {
  if (countr) {
    return countr.value > 101;
  } else {
    return false;
  }
};

export default Game101;
