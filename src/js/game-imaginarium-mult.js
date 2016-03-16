import inherit from 'inherit';
import Game from 'game';

function GameImaginariumMult() {
  this.name = 'Имаджинариум Союзмультфильм';
  this.minimalValue = 1;
  this.loopSize = 30;
  this.containsStateImages = true;
  this._editableValues = false;
}

inherit(GameImaginariumMult, Game);

export default GameImaginariumMult;
