import { syncFormFields } from './utils/utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendAd } from './api.js';
import { resetFilterForm } from './filters.js';
import { resetMap } from './map.js';

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const checkInSelect = adForm.querySelector('#timein');
const checkOutSelect = adForm.querySelector('#timeout');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

function toggleAdForm () {
  adForm.classList.toggle('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = !node.disabled);
}

toggleAdForm();

checkInSelect.addEventListener('change', () => {
  syncFormFields(checkInSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], (newValue) => {
    checkOutSelect.value = newValue;
  });
});

checkOutSelect.addEventListener('change', () => {
  syncFormFields(checkOutSelect, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], (newValue) => {
    checkInSelect.value = newValue;
  });
});

typeSelect.addEventListener('change', () => {
  syncFormFields(typeSelect, ['bungalow', 'flat', 'hotel', 'house', 'palace'], ['0', '1000', '3000', '5000', '10000'], (newValue) => {
    priceInput.min = newValue;
    priceInput.placeholder = newValue;
  });
});

function setAddress ({lat, lng}) {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  addressInput.readOnly = true;
}

function resetAd () {
  adForm.reset();
  resetFilterForm();
  resetMap();
}

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  sendAd(() => {
    showSuccessMessage();
    resetAd();
  },
  showErrorMessage,
  formData);
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAd();
});

export { toggleAdForm, setAddress };
