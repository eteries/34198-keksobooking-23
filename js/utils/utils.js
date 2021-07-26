const ALERT_SHOW_TIME = 5000;

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

function removeChildren (node) {
  while (node.firstChild) {
    node.firstChild.remove();
  }
}

export {
  declineNoun,
  syncFormFields,
  showAlert,
  isEscEvent,
  removeChildren
};
