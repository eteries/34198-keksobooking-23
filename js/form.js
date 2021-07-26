import { syncFormFields } from './utils/utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendAd } from './api.js';
import { resetFilterForm } from './filters.js';
import { resetMap } from './map.js';
import { validatePrice, validateTitle, validateCapacity, isAdFormValid } from './validation.js';
import { showPreview } from './image.js';

const AvatarOptions = {
  WIDTH: 40,
  HEIGHT: 40,
  ALT: 'Ваше фото или аватар',
};

const PhotoOptions = {
  WIDTH: 70,
  HEIGHT: 70,
  ALT: 'Фотография жилья',
};

const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
const fieldsets = adForm.querySelectorAll('fieldset');
const checkInSelect = adForm.querySelector('#timein');
const checkOutSelect = adForm.querySelector('#timeout');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const titleInput = adForm.querySelector('#title');
const typeInput = adForm.querySelector('#type');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

const avatarSelector = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');
const photoSelector = adForm.querySelector('.ad-form__upload input[type=file]');
const photoPreview = adForm.querySelector('.ad-form__photo');

function toggleAdForm () {
  adForm.classList.toggle('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = !node.disabled);
}

function setAddress ({lat, lng}) {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  addressInput.readOnly = true;
}

function syncTypePrice () {
  syncFormFields(typeSelect, ['bungalow', 'flat', 'hotel', 'house', 'palace'], ['0', '1000', '3000', '5000', '10000'], (newValue) => {
    priceInput.min = newValue;
    priceInput.placeholder = newValue;
  });
}

function resetAd () {
  adForm.reset();
  syncTypePrice();
  resetFilterForm();
  resetMap();
}

function onTitleInput () {
  validateTitle();
}

function onTypeChange () {
  syncTypePrice();
  validatePrice();
}

function onPriceInput () {
  validatePrice();
}

function onCheckInChange () {
  syncFormFields(checkInSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], (newValue) => {
    checkOutSelect.value = newValue;
  });
}

function onCheckOutChange () {
  syncFormFields(checkOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], (newValue) => {
    checkInSelect.value = newValue;
  });
}

function onRoomNumberChange () {
  validateCapacity();
}

function onCapacityChange () {
  validateCapacity();
}

function onAvatarChange () {
  showPreview(avatarSelector, avatarPreview, AvatarOptions);
}

function onPhotoChange () {
  showPreview(photoSelector, photoPreview, PhotoOptions);
}

function onResetButtonClick (evt) {
  evt.preventDefault();
  resetAd();
}

function onAdFormSubmit (evt) {
  evt.preventDefault();

  if (!isAdFormValid()) {
    return;
  }

  const formData = new FormData(evt.target);
  sendAd(() => {
    showSuccessMessage();
    resetAd();
  },
  showErrorMessage,
  formData);
}

titleInput.addEventListener('input', onTitleInput);
priceInput.addEventListener('input', onPriceInput);
typeInput.addEventListener('change', onTypeChange);
checkInSelect.addEventListener('change', onCheckInChange);
checkOutSelect.addEventListener('change', onCheckOutChange);
roomNumberSelect.addEventListener('change', onRoomNumberChange);
capacitySelect.addEventListener('change', onCapacityChange);
avatarSelector.addEventListener('change', onAvatarChange);
photoSelector.addEventListener('change', onPhotoChange);
resetButton.addEventListener('click', onResetButtonClick);
adForm.addEventListener('submit', onAdFormSubmit);

toggleAdForm();

export { toggleAdForm, setAddress };
