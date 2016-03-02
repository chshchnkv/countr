import getElementFromTemplate from 'templates';

/// Конструктор Game для создания новых игр
function Game(name, minimalValue) {
  this.name = name;
  this.minimalValue = minimalValue;
  this.isActive = false;
}

Game.prototype.initialValue = function() {
  if (isFinite(this.minimalValue)) {
    return this.minimalValue;
  } else {
    return 0;
  }
};

Game.prototype.isOver = function(countr) {
  return countr !== null;
};

Game.prototype.isValidValue = function(value) {
  return value >= this.minimalValue;
};

Game.prototype.render = function() {
  this.element = getElementFromTemplate('template-game');
  this.element.textContent = this.name;

  return this.element;
};

Game.prototype.makeActive = function(val) {
  this.isActive = val;
  if (val) {
    this.element.classList.add('countr-games__item--active');
  } else {
    this.element.classList.remove('countr-games__item--active');
  }
};

export default Game;
