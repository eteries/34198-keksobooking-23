function validateRange (from, to) {
  if (from < 0 || to < 0) {
    throw new RangeError('The arguments can\'t be negative');
  }

  if (from >= to) {
    throw new RangeError('The first argument must be less than the second one');
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

getRandomInt(1, 10);
getRandomFloat (60.03, 60.1, 4);
