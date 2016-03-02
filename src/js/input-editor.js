function Editor(element, initValue) {
  this.element = element;
  this._value = initValue;
  this._onEditorBlur = this._onEditorBlur.bind(this);
  this._onEditorKeyDown = this._onEditorKeyDown.bind(this);
}

Editor.prototype.show = function() {
  this.element.value = this._value;
  this.element.addEventListener('blur', this._onEditorBlur);
  this.element.addEventListener('keydown', this._onEditorKeyDown);
  this.element.classList.remove('hidden');
  this.element.setSelectionRange(0, this.element.value.length);
  this.element.focus();
};

Editor.prototype.hide = function() {
  this.element.classList.add('hidden');
  this.element.removeEventListener('blur', this._onEditorBlur);
  this.element.removeEventListener('keydown', this._onEditorKeyDown);
};

Editor.prototype._onEditorBlur = function() {
  this.set();
  this.hide();
};

Editor.prototype._onEditorKeyDown = function(event) {
  switch (event.keyCode) {
    case 27:
      this.reset();
      this.hide();
      break;
    case 13:
      this.set();
      this.hide();
      break;
  }
};

Editor.prototype.set = function() {
  this._value = this.element.value;
  var evt = document.createEvent('CustomEvent');
  evt.initEvent('change', false, false, {});
  this.element.dispatchEvent(evt);
};

Editor.prototype.reset = function() {
  this.element.value = this._value;
};

Editor.prototype.value = function() {
  return this._value;
};

export default Editor;