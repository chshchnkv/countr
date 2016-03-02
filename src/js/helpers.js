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

export function getSign(number) {
  var sign = 0;
  if (number) {
    sign = number < 0 ? -1 : 1;
  }
  return sign;
}

export function getRandomColorIndex() {
  return Math.floor(Math.random() * 20 + 1);
}

