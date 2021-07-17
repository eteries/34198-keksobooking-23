import { toggleForm, setAddress } from './form.js';
import { getOffers } from './api.js';
import { createPopup } from './popup.js';
import { showAlert } from './utils.js';

const TOKYO_CENTER_COORDS = {
  lat: 35.67917,
  lng: 139.75421,
};

const VISIBLE_POINTS_NUM = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    toggleForm();
    setAddress(TOKYO_CENTER_COORDS);
  })
  .setView(TOKYO_CENTER_COORDS, 13);

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
    .addTo(map)
    .bindPopup(
      createPopup(point),
      {
        keepInView: true,
      },
    );
};

getOffers(
  (points) => {
    points.slice(0, VISIBLE_POINTS_NUM).forEach((point) => {
      createMarker(point);
    });
  },
  (errorMessage) => {
    showAlert(errorMessage);
  });

function resetMap () {
  setAddress(TOKYO_CENTER_COORDS);
  mainPinMarker.setLatLng(TOKYO_CENTER_COORDS);
}

export { resetMap };
