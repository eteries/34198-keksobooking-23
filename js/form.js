const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('.map__filter, .map__features');

function toggleForm () {
  adForm.classList.toggle('ad-form--disabled');
  fieldsets.forEach((node) => node.disabled = !node.disabled);

  filterForm.classList.toggle('map__filters--disabled');
  filters.forEach((node) => node.disabled = !node.disabled);
}

toggleForm();

export { toggleForm };
