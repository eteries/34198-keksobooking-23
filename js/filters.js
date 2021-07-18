import { placeMarkers } from './map.js';
import { debounce } from './utils/debounce.js';

const PRICES = {
  LOW: 10000,
  HIGH: 50000,
};

const RERENDER_TIME = 500;

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelectorAll('[name="features"]');

const currentFilter = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

function checkType (point) {
  return currentFilter.type === point.offer.type || currentFilter.type === 'any';
}

function checkPrice (point) {
  return (
    currentFilter.price === 'any'
    || (point.offer.price < PRICES.LOW && currentFilter.price === 'low')
    || (point.offer.price > PRICES.HIGH && currentFilter.price === 'high')
    || (point.offer.price >= PRICES.LOW && point.offer.price <= PRICES.HIGH && currentFilter.price === 'middle')
  );
}

function checkRooms (point) {
  return currentFilter.rooms === point.offer.rooms.toString() || currentFilter.rooms === 'any';
}

function checkGuests (point) {
  return currentFilter.guests === point.offer.guests.toString() || currentFilter.guests === 'any';
}

function checkFeatures (point) {
  return currentFilter.features.every((feature) => {
    if (point.offer.features) {
      return point.offer.features.includes(feature);
    }
  });
}

const checks = [
  checkType,
  checkFeatures,
  checkPrice,
  checkRooms,
  checkGuests,
];

function applyFilters () {
  debounce(() => {
    placeMarkers((point) => checks.every((check) => check(point)));
  }, RERENDER_TIME)();
}

function onSelectChange (evt, key) {
  currentFilter[key] = evt.target.value;
  applyFilters();
}

function onFeaturesChange () {
  currentFilter.features = [...housingFeatures]
    .reduce(
      (arr, input) => {
        if (input.checked) {
          arr.push(input.value);
          return arr;
        }
        return arr;
      },
      []);
  applyFilters();
}

housingType.addEventListener('change', (evt) => onSelectChange(evt, 'type'));
housingPrice.addEventListener('change', (evt) => onSelectChange(evt, 'price'));
housingRooms.addEventListener('change', (evt) => onSelectChange(evt, 'rooms'));
housingGuests.addEventListener('change', (evt) => onSelectChange(evt, 'guests'));
housingFeatures.forEach((input) => input.addEventListener('change', onFeaturesChange));
