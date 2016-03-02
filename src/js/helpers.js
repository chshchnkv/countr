export function getTextContentNode(element) {
  if (element) {
    let textNodes = [].filter.call(element.childNodes, (item) => {
      return item.nodeType === 3;
    });
    if (textNodes.length > 0) {
      return textNodes[0];
    }
  }
  return null;
}

export function getTextContent(element) {
  let textNode = getTextContentNode(element);
  if (textNode) {
    return textNode.textContent;
  }
  return '';
}

export function setTextContent(element, value) {
  let textNode = getTextContentNode(element);
  if (textNode) {
    textNode.textContent = value;
  } else {
    textNode = document.createTextNode(value);
    element.appendChild(textNode);
  }
}
