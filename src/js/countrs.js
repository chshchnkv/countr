import Countr from 'countr';

function Countrs(games) {
  this.element = document.querySelector('.countr-container');
  this._games = games;
  this._counters = [];
}

Countrs.prototype.add = function() {
  var newCountr = new Countr(this._getNextCountrName(), this._games.noGame.initialValue(), this);
  this._counters.push(newCountr);
  this.element.appendChild(newCountr.render());
  newCountr.editName();
};

Countrs.prototype._getNextCountrName = function() {
  return 'Счётчик ' + (+this._counters.length + 1);
};

Countrs.prototype.delete = function(countr) {
  this._counters.splice(this._counters.indexOf(countr), 1);
};

Countrs.prototype.reset = function() {
  this._counters.forEach((countr) => {
    countr.reset();
  });
};

Countrs.prototype._getCurrentGame = function() {
  return this._games.getActiveGame();
};

export default Countrs;
