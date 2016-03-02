import inherit from 'inherit';
import Game from 'game';

function GameImaginariumMult() {
  this.name = 'Имаджинариум Союзмультфильм';
  this.minimalValue = 1;
}

inherit(GameImaginariumMult, Game);

export default GameImaginariumMult;
