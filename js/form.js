import { syncFormFields } from './utils.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendAd } from './api.js';
import { resetMap } from './map.js';

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('.map__filter, .map__features');
const checkInSelect = adForm.querySelector('#timein');
const checkOutSelect = adForm.querySelector('#timeout');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const addressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

function toggleForm () {
  adForm.classList.toggle('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = !node.disabled);

  filterForm.classList.toggle('map__filters--disabled');
  filters.forEach((node) => node.disabled = !node.disabled);
}

toggleForm();

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
  filterForm.reset();
  adForm.reset();
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

export { toggleForm, setAddress };
