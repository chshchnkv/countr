import Editor from 'input-editor';
import inherit from 'inherit';

function IntEditor(element, initValue) {
  this.init(element, initValue);
}
inherit(IntEditor, Editor);

IntEditor.prototype.validate = function(newValue) {
  let res = parseInt(newValue, 10);
  return !isNaN(res);
};


export default IntEditor;
