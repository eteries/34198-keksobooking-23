import { getOffers } from './data.js';
import { declineNoun } from './utils/utils.js';

const OFFER_TYPES_TOKENS = {
  flat: 'квартира',
  bungalow: 'бунгало',
  house: 'дом',
  palace: 'дворец',
  hotel: 'отель',
};

const DEFAULT_AVATAR_PATH = 'img/avatars/default.png';

const cardTemplate = document.querySelector('#card');

function placeText (text, selector, parentNode = document) {
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

  placeText(offer.title, '.popup__title', newPopup);
  placeText(offer.address, '.popup__text--address', newPopup);
  placeText(`${offer.price} ₽/ночь`, '.popup__text--price', newPopup);
  placeText(OFFER_TYPES_TOKENS[offer.type], '.popup__type', newPopup);
  placeText(`${offer.rooms} ${declineNoun(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${declineNoun(offer.guests, 'гостя', 'гостей', 'гостей')}`, '.popup__text--capacity', newPopup);
  placeText(`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`, '.popup__text--time', newPopup);
  placeText(offer.description, '.popup__description', newPopup);

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

getOffers();

export { createPopup };
