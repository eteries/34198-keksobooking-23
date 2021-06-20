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

export {
  getRandomInt,
  getRandomFloat,
  getUniqueRandomInt,
  getRandomArrayElement,
  getRandomSubArray
};
