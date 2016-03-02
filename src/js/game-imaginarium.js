import inherit from 'inherit';
import Game from 'game';

function GameImaginarium() {
  this.name = 'Имаджинариум';
  this.minimalValue = 1;
}

inherit(GameImaginarium, Game);

export default GameImaginarium;
