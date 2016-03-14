function Editor(element, initValue) {
  this.init(element, initValue);
}

Editor.prototype.init = function(element, initValue) {
  this.element = element;
  this._value = initValue;
  this._onEditorBlur = this._onEditorBlur.bind(this);
  this._onEditorKeyDown = this._onEditorKeyDown.bind(this);
};

Editor.prototype.show = function() {
  this.element.value = this._value;
  this.element.addEventListener('blur', this._onEditorBlur);
  this.element.addEventListener('keydown', this._onEditorKeyDown);
  this.element.classList.remove('hidden');

  if (this.element.type !== 'number') {
    this.element.setSelectionRange(0, this.element.value.length);
  }
  this.element.focus();
};

Editor.prototype.hide = function() {
  this.element.classList.add('hidden');
  this.element.removeEventListener('blur', this._onEditorBlur);
  this.element.removeEventListener('keydown', this._onEditorKeyDown);
};

Editor.prototype._onEditorBlur = function() {
  this._commit();
  this.hide();
};

Editor.prototype._onEditorKeyDown = function(event) {
  switch (event.keyCode) {
    case 27:
      this.hide();
      break;
    case 13:
      this.hide();
      this._commit();
      break;
  }
};

/**
* Проверка значения на валидность. В базовой реализации всегда возвращает true.
* Дочерние классы могут через этот метод влиять на результат работы commit
*@return {boolean}
*/
Editor.prototype.validate = function() {
  return true;
};

/**
* Коммит значения, введенного пользователем. Если значение проходит валидацию, то бросается кастомное событие changevalue в котором передается новое значение.
*/
Editor.prototype._commit = function() {
  if ((this._value !== this.element.value) && this.validate(this.element.value)) {
    this._value = this.element.value;
    var event = new CustomEvent('changevalue', { 'detail': this._value });
    this.element.dispatchEvent(event);
  }
};

Editor.prototype.getValue = function() {
  return this._value;
};

export default Editor;
