import {isEscEvent} from './utils/utils.js';

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

function removeMessage (message, handler) {
  document.removeEventListener('keydown', handler);
  message.remove();
}

function showMessage (template, selector) {
  const newMessage =  template
    .content
    .cloneNode(true)
    .querySelector(selector);

  function onMessageEscKeydown (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessage(newMessage, onMessageEscKeydown);
    }
  }

  function onMessageClick () {
    removeMessage(newMessage, onMessageEscKeydown);
  }

  newMessage.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeydown);

  document.body.appendChild(newMessage);
}

function showSuccessMessage () {
  showMessage(successTemplate, '.success');
}

function showErrorMessage () {
  showMessage(errorTemplate, '.error');
}

export { showSuccessMessage, showErrorMessage };
