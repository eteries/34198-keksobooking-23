import { isPalace } from './utils.js';

const adForm = document.querySelector('.ad-form');

const titleInput = adForm.querySelector('#title');
titleInput.addEventListener('input', () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Поле обязательно для заполнения');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Минимальная длина — 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Максимальная длина — 100 символов');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

const priceInput = adForm.querySelector('#price');
priceInput.addEventListener('input', () => {
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Поле обязательно для заполнения');
  } else if (priceInput.validity.badInput) {
    priceInput.setCustomValidity('Числовое поле');
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Минимальная цена — ${priceInput.min}`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Максимальная цена — 1000000');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

function validatePalace (capacity) {
  const message = capacity === 0
    ? ''
    : 'Выбранный тип жилья - не для гостей';
  capacitySelect.setCustomValidity(message);
}

function validateGuests (roomNumber, capacity) {
  if (capacity === 0) {
    capacitySelect.setCustomValidity('Выберите число гостей');
  } else if (roomNumber < capacity) {
    capacitySelect.setCustomValidity(`Максимальное число гостей для выбранного жилья - ${roomNumber}`);
  } else {
    capacitySelect.setCustomValidity('');
  }
}

function validateCapacity () {
  const roomNumber = Number(roomNumberSelect.value);
  const capacity = Number(capacitySelect.value);

  isPalace(roomNumber)
    ? validatePalace(capacity)
    : validateGuests(roomNumber, capacity);
  capacitySelect.reportValidity();
}

roomNumberSelect.addEventListener('change', validateCapacity);
capacitySelect.addEventListener('change', validateCapacity);
validateCapacity();
