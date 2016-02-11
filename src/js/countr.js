'use strict';

(function(gl) {

  function Game(name, minimalValue) {
    this.name = name;
    this.minimalValue = minimalValue;
  }

  Game.prototype.isOver = function(countr) {
    return countr !== null;
  };
  Game.prototype.isValidValue = function(value) {
    return value >= this.minimalValue;
  };

  var gameDefault = new Game('Без игры', -Infinity);

  var game101 = new Game('101', -Infinity);
  game101.isOver = function(countr) {
    return countr.value > 101;
  };

  var gameImaginarium = new Game('Имаджинариум', 1);
  var gameImaginariumMult = new Game('Имаджинариум Союзмультфильм', 1);

  function Countr(name, initialValue) {
    this.name = name;
    this.value = initialValue;
    this.element = null;
  }

  Countr.prototype.availableGames = [gameDefault, game101, gameImaginarium, gameImaginariumMult];
  Countr.prototype.currentGame = gameDefault;
  Countr.prototype.updateValue = function() {
    var valueElement = this.element.querySelector('.countr__value');
    valueElement.textContent = this.value;
  };
  Countr.prototype.change = function(value) {
    this.set(this.value + (value || 1));
  };
  Countr.prototype.set = function(newValue) {
    if (this.currentGame) {
      if (this.currentGame.isValidValue(newValue)) {
        this.value = newValue;
      }
    } else {
      this.value = newValue;
    }
    this.updateValue();
  };
  Countr.prototype.reset = function() {
    var countr = this;
    var curValue = this.value;
    var newValue = isFinite(this.currentGame.minimalValue) ? this.currentGame.minimalValue : 0;

    if (curValue !== newValue) {
      var step = (newValue - curValue) < 0 ? -1 : 1;
      var timer = 500 / (Math.abs(newValue - curValue));

      setTimeout(onTimer, timer);
    }

    function onTimer() {

      curValue += step;
      countr.set(curValue);
      if (curValue !== newValue) {
        setTimeout(onTimer, timer);
      }
    }
  };

  gl.Countr = Countr;
})(window);
