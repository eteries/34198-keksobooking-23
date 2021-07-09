const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('.map__filter, .map__features');

function disableForm () {
  adForm.classList.add('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = true);

  filterForm.classList.add('map__filters--disabled');
  filters.forEach((node) => node.disabled = true);
}

function activateForm () {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = false);

  filterForm.classList.remove('map__filters--disabled');
  filters.forEach((node) => node.disabled = false);
}

disableForm();

export { activateForm };
