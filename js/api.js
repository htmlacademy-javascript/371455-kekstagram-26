import {SERVER_URL} from './constants.js';
import {showMessage} from './message.js';

const ERROR_MESSAGE = 'Произошла ошибка загрузки данных с сервера.';


const getData = async () => {
  let response;

  try {
    response = await fetch(`${SERVER_URL}/data`);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    showMessage(ERROR_MESSAGE);
    return [];
  }

  const data = await response.json();

  return data;
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
      onSuccess();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    onFail();
  }
};

export {getData, sendData};
