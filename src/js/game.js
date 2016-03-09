import getElementFromTemplate from 'templates';
import {setTextContent} from 'helpers';
import Picture from 'picture';

/// Конструктор Game для создания новых игр
function Game(name, minimalValue) {
  this.name = name;
  this.minimalValue = minimalValue;
//  this._blankStateImage = new Picture('./img/blank.png');
}

Game.prototype.initialValue = function() {
  if (isFinite(this.minimalValue)) {
    return this.minimalValue;
  } else {
    return 0;
  }
};

Game.prototype._blankStateImage = new Picture('./img/blank.png');

Game.prototype.loopSize = 0;

Game.prototype.isOver = function(countr) {
  return countr !== null;
};

Game.prototype.validateValue = function(curLoop, value) {
  return {
    'newValue': value,
    'newLoop': curLoop
  };
};

Game.prototype.isValidValue = function(value) {
  return value >= this.minimalValue;
};

Game.prototype.getStateImage = function() {
  return this._blankStateImage;
};

Game.prototype.render = function(id) {
  this.element = getElementFromTemplate('template-game');
  this._label = this.element.querySelector('label');
  this._radio = this.element.querySelector('input[type="radio"]');

  this._radio.setAttribute('id', id);
  this._label.setAttribute('for', id);

  setTextContent(this._label, this.name);

  return this.element;
};

Game.prototype.check = function() {
  this._radio.setAttribute('checked', 'true');
};

export default Game;
