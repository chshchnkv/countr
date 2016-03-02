export default function(templateId) {
  var template = document.querySelector('#' + templateId);
  var element = ('content' in template) ? template.content.children[0].cloneNode(true) : template.children[0].cloneNode(true);

  return element;
}
