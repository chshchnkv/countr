import Game from 'game';
import Game101 from 'game-101';
import GameImaginarium from 'game-imaginarium';
import GameImaginariumMult from 'game-imaginarium-mult';

function Games() {
  this._onGameChange = this._onGameChange.bind(this);
  this.element = document.querySelector('.countr-header__games');
  this.element.addEventListener('change', this._onGameChange);

  /// создаем игры
  this.noGame = new Game('Без игры', -Infinity);
  this.noGame.isOver = function() {
    return false;
  };

  this._allGames = [
    this.noGame,
    new Game101(),
    new GameImaginarium(),
    new GameImaginariumMult()
  ];
}

Games.prototype.render = function() {
  this._allGames.forEach((game, index) => {
    this.element.appendChild(game.render(`game${index}`));
  });
  this.noGame.check();
};

Games.prototype.getActiveGame = function() {
  let activeGameElement = this.element.querySelector('input[type="radio"]:checked');
  let gameIndex = activeGameElement.id.match(/game(\d*)/);
  if (gameIndex.length > 1) {
    return this._allGames[gameIndex[1]];
  }
  return null;
};

Games.prototype.show = function() {
  this.element.classList.remove('hidden');
};

Games.prototype.hide = function() {
  this.element.classList.add('hidden');
};

Games.prototype.toggle = function() {
  this.element.classList.toggle('hidden');
};

Games.prototype._onGameChange = function() {
  this.toggle();
};

export default Games;
