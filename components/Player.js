export default class Player {
  constructor(data, template) {
    this._data = data;
    this._template = template;
  }
  _getCardElement() {
    return (this._cardElement = document
      .querySelector(this._template)
      .content.querySelector(".swiper-slide")
      .cloneNode(true));
  }
  getView() {
    this._cardElement = this._getCardElement();

    this._cardName = this._cardElement.querySelector(".swiper-name");
    this._cardImage = this._cardElement.querySelector(".swiper-image");
    this._cardLink = this._cardElement.querySelector(".swiper-link");

    this._cardImage.src = this._data.image;
    this._cardLink.textContent = this._data.name + " - " + this._data.POS;
    this._cardLink.href = this._data.link;
    this._cardImage.alt = this._data.name;

    return this._cardElement;
  }
}
