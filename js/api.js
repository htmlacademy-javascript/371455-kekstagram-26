import { showAlertMessage } from './alert.js';

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';
const ERROR_MESSAGE = 'Произошла ошибка загрузки данных с сервера.';


const getData = async (onSuccess) => {
  let response;

  try {
    response = await fetch(`${SERVER_URL}/data`);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    showAlertMessage(ERROR_MESSAGE);
    return [];
  }

  const data = await response.json();

  onSuccess(data);
};

const sendData = async (form, onSuccess, onFail) => {
  try {
    const response = await fetch(
      SERVER_URL,
      {
        method: 'POST',
        type: 'multipart/form-data',
        body: new FormData(form),
      }
    );

    if (response.ok) {
      onSuccess(true);
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    onFail('Не удалось отправить форму. Попробуйте ещё раз!');
  }
};

export { getData, sendData };

