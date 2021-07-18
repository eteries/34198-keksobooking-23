import { toggleAdForm, toggleFilterForm, setAddress } from './form.js';
import { getOffers } from './api.js';
import { createPopup } from './popup.js';
import { showAlert } from './utils/utils.js';

const TOKYO_CENTER_COORDS = {
  lat: 35.67917,
  lng: 139.75421,
};

const VISIBLE_POINTS_NUM = 10;
const MAP_SCALE_LEVEL = 12;

let points = [];

const map = L.map('map-canvas')
  .on('load', () => {
    setAddress(TOKYO_CENTER_COORDS);
    toggleAdForm();
  })
  .setView(TOKYO_CENTER_COORDS, MAP_SCALE_LEVEL);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  TOKYO_CENTER_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location: {lat, lng}} = point;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      createPopup(point),
      {
        keepInView: true,
      },
    );
};

function placeMarkers (cb) {
  console.log('ztart placing');
  markerGroup.clearLayers();
  const newPoints = (typeof cb === 'function')
    ? points.filter(cb)
    : [...points];

  if (!newPoints.length) {
    showAlert('Нет соответствующих предложений');
  }

  newPoints
    .slice(0, VISIBLE_POINTS_NUM)
    .forEach((point) => {
      createMarker(point);
    });
}

getOffers(
  (newPoints) => {
    points = newPoints;
    placeMarkers();
    toggleFilterForm();
  },
  (errorMessage) => {
    showAlert(errorMessage);
  });

function resetMap () {
  setAddress(TOKYO_CENTER_COORDS);
  mainPinMarker.setLatLng(TOKYO_CENTER_COORDS);
}

export { placeMarkers, resetMap };
