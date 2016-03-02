import Game from 'game';
import Game101 from 'game-101';
import GameImaginarium from 'game-imaginarium';
import GameImaginariumMult from 'game-imaginarium-mult';

function Games() {
  this.element = document.querySelector('.countr-header__games');
  this._onClick = this._onClick.bind(this);
  this.element.addEventListener('click', this._onClick);

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
  this._allGames.forEach((game) => {
    this.element.appendChild(game.render());
    if (this.noGame === game) {
      game.makeActive(true);
    }
  });
};

Games.prototype.getActiveGame = function() {
  let activeGames = this._allGames.filter((game) => {
    return game.isActive;
  });
  if (activeGames.length > 0) {
    return activeGames[0];
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

Games.prototype._onClick = function(event) {
  event.preventDefault();
  var tappedElement = event.target;
  if (tappedElement.classList.contains('countr-games__item')) {
    this._allGames.forEach((game) => {
      game.makeActive(game.element === tappedElement);
    });
  }
  this.toggle();
};

export default Games;
