/**
* Картинка для счетчика
*@constructor
*/

function Picture(src, alt) {
  let image = new Image();
  image.onload = () => {
    image.alt = alt || '';
    this.img = image;
  };
  image.src = src;
}

export default Picture;
