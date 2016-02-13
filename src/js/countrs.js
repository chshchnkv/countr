'use strict';
(function(gl) {

  function Countrs(games) {
    this.element = document.querySelector('.countr-container');
    this._games = games;
    this._counters = [];
  }

  Countrs.prototype.add = function() {
    var newCountr = new gl.Countr(this._getNextCountrName(), this._games.defaultGame, this);
    this._counters.push(newCountr);
    this.element.appendChild(newCountr.render());
  };

  Countrs.prototype._getNextCountrName = function() {
    return gl.prompt('Название счётчика', 'Счётчик ' + (+this._counters.length + 1));
  };

  Countrs.prototype.delete = function(countr) {
    this._counters.splice(this._counters.indexOf(countr), 1);
  };

  Countrs.prototype.reset = function() {
    this._counters.forEach(function(countr) {
      countr.reset();
    }, this);
  };

  Countrs.prototype._getCurrentGame = function() {
    return this._games.defaultGame;
  };

  gl.Countrs = Countrs;
})(window);
