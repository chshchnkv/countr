'use strict';
(function(gl) {

  function Games() {
    this.element = document.querySelector('.countr-header__games');
    this._onClick = this._onClick.bind(this);
    this.element.addEventListener('tap', this._onClick);

    /// создаем игры
    this.defaultGame = new gl.Game('Без игры', -Infinity);
    this.defaultGame.isOver = function() {
      return false;
    };

    var game101 = new gl.Game('101', -Infinity);
    game101.isOver = function(countr) {
      return countr.value > 101;
    };

    this._allGames = [
      this.defaultGame,
      game101,
      new gl.Game('Имаджинариум', 1),
      new gl.Game('Имаджинариум Союзмультфильм', 1)
    ];
  }

  Games.prototype.render = function() {
    this._allGames.forEach(function(game) {

      this.element.appendChild(game.render());
      if (this.defaultGame === game) {
        game.makeActive(true);
      }
    }, this);
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
      this._allGames.forEach(function(game) {
        game.makeActive(game.element === tappedElement);
      });
    }
    this.toggle();
  };

  gl.Games = Games;
})(window);
