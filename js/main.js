const MOCK_OFFERS_NUM = 10;

const COORDINATES = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
  PRECISION: 5,
};

const AVATAR_INDEXES = {
  MIN: 1,
  MAX: 10,
};

const PRICES = {
  MIN: 50,
  MAX: 1000,
};

const ROOMS = {
  MIN: 1,
  MAX: 10,
};

const GUESTS = {
  MIN: 1,
  MAX: 20,
};

const titles = [
  [
    'Самое',
    'Очень',
    'Достаточно',
    'Неожиданно',
  ],
  [
    'выгодное',
    'оригинальное',
    'доступное',
    'востребованное',
  ],
  [
    'предложение',
    'размещение',
    'объявление',
    'расположение',
  ],
];

const descriptions = [
  [
    'в центре',
    'на окраине',
    'в промышленном квартале',
    'недалеко от',
    'всего в часе езды от',
  ],
  [
    'большой площадью',
    'роскошью убранства',
    'удобными кроватями',
    'едой в холодильнике',
    'видом из окна',
    'различными удобствами',
  ],
];

const placementTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const checkInHours = [
  '12:00',
  '13:00',
  '14:00',
];

const checkOutHours = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function validateRange (from, to) {
  if (from < 0 || to < 0) {
    throw new RangeError('The arguments can\'t be negative');
  }

  if (from > to) {
    throw new RangeError('The first argument must not be greater than the second one');
  }
}

function getRandomInt (from, to) {
  validateRange(from, to);

  return Math.round(from + Math.random() * (to - from));
}

function getRandomFloat (from, to, digits) {
  validateRange(from, to);

  return (from + Math.random() * (to - from)).toFixed(digits);
}

function getUniqueRandomInt (from, to) {
  const taken = [];

  return function () {
    while (taken.length <= to - from) {
      const num = getRandomInt(from, to);

      if (taken.includes(num)) {
        continue;
      }

      taken.push(num);
      return num;
    }
  };
}

function getRandomSubArray (array) {
  const arrayCopy = [...array];

  return new Array(getRandomInt(1, array.length))
    .fill(null)
    .map(() => arrayCopy.splice(getRandomInt(0, arrayCopy.length - 1),1)[0]);
}

function getRandomArrayElement (array) {
  return array[getRandomInt(0, array.length - 1)];
}

const getAvatarIndex = getUniqueRandomInt(AVATAR_INDEXES.MIN, AVATAR_INDEXES.MAX);

function getAvatarNormalizedIndex () {
  const indexString = getAvatarIndex().toString();

  return indexString.length === 1 ? `0${indexString}` : indexString;
}

function createMockOffer () {
  const latitude = getRandomFloat(COORDINATES.LAT.MIN, COORDINATES.LAT.MAX, COORDINATES.PRECISION);
  const longitude = getRandomFloat(COORDINATES.LNG.MIN, COORDINATES.LNG.MAX, COORDINATES.PRECISION);

  return {
    author: {
      avatar: `img/avatars/user${getAvatarNormalizedIndex()}.png`,
    },
    offer: {
      title: titles.map((group) => getRandomArrayElement(group)).join(' '),
      address: `${latitude}, ${longitude}`,
      price: getRandomInt(PRICES.MIN, PRICES.MAX),
      type: getRandomArrayElement(placementTypes),
      rooms: getRandomInt(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomInt(GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomArrayElement(checkInHours),
      checkout: getRandomArrayElement(checkOutHours),
      features: getRandomSubArray(features),
      description: `Этот объект, находящийся ${getRandomArrayElement(descriptions[0])} Токио, привлечёт ваше внимание ${getRandomArrayElement(descriptions[1])}.`,
      photos: getRandomSubArray(photos),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
}

function createMockData () {
  return new Array(MOCK_OFFERS_NUM)
    .fill(null)
    .map(() => createMockOffer());
}

createMockData();
