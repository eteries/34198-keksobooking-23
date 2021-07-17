const API = 'https://23.javascript.pages.academy/keksobooking';

const getOffers = (onSuccess, onFail) => {
  fetch(`${API}/data`)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('Объявления не доступны. Попробуйте позже.');
    });
};

const sendAd = (onSuccess, onFail, body) => {
  fetch(
    API,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getOffers, sendAd };
