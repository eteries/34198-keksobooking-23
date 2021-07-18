const ALERT_SHOW_TIME = 5000;

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

function declineNoun (number, case1, case2, case5) {
  number %= 100;
  if (number >= 5 && number <= 20) {
    return case5;
  }
  number %= 10;
  if (number === 1) {
    return case1;
  }
  if (number >= 2 && number <= 4) {
    return case2;
  }
  return case5;
}

function syncFormFields (node, arrayFrom, arrayTo, setField) {
  const selectedIndex = arrayFrom.indexOf(node.value);
  const newValue = arrayTo[selectedIndex];

  if (typeof setField === 'function') {
    setField(newValue);
  }
}

function showAlert (message, bgColor = 'red') {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 500;
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '300px';
  alertContainer.style.top = '20px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = bgColor;
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function isEscEvent (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export {
  getRandomInt,
  getRandomFloat,
  getUniqueRandomInt,
  getRandomArrayElement,
  getRandomSubArray,
  declineNoun,
  syncFormFields,
  showAlert,
  isEscEvent
};