import { declineNoun } from './utils/utils.js';

const OfferTypeTokens = {
  FLAT: 'квартира',
  BUNGALOW: 'бунгало',
  HOUSE: 'дом',
  PALACE: 'дворец',
  HOTEL: 'отель',
};

const DEFAULT_AVATAR_PATH = 'img/avatars/default.png';

const cardTemplate = document.querySelector('#card');

function putText (text, selector, parentNode = document) {
  const element = parentNode.querySelector(selector);
  text
    ? element.textContent = text
    : element.remove();
}

function createPopup ({offer, author: {avatar}}) {
  const newPopup = cardTemplate
    .content
    .cloneNode(true)
    .querySelector('.popup');

  putText(offer.title, '.popup__title', newPopup);
  putText(offer.address, '.popup__text--address', newPopup);
  putText(`${offer.price} ₽/ночь`, '.popup__text--price', newPopup);
  putText(OfferTypeTokens[offer.type.toUpperCase()], '.popup__type', newPopup);
  putText(`${offer.rooms} ${declineNoun(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${declineNoun(offer.guests, 'гостя', 'гостей', 'гостей')}`, '.popup__text--capacity', newPopup);
  putText(`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`, '.popup__text--time', newPopup);
  putText(offer.description, '.popup__description', newPopup);

  const features = newPopup.querySelector('.popup__features');
  if (offer.features) {
    features.querySelectorAll('.popup__feature')
      .forEach((element) => {
        if (offer.features.every((feature) => !element.classList.contains(`popup__feature--${feature}`))) {
          element.remove();
        }
      });
  } else {
    features.remove();
  }

  const photos = newPopup.querySelector('.popup__photos');
  const photoExample = photos.querySelector('.popup__photo');
  photos.removeChild(photoExample);
  if (offer.photos) {
    offer.photos.forEach((src) => {
      const newPhoto = photoExample.cloneNode();
      newPhoto.src = src;
      photos.appendChild(newPhoto);
    });
  } else {
    photos.remove();
  }

  newPopup.querySelector('.popup__avatar')
    .src = avatar || DEFAULT_AVATAR_PATH;

  return newPopup;
}

export { createPopup };
