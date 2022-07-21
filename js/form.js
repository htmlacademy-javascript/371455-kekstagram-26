import { sendData } from './api.js';
import { overlayClose } from './overlay.js';
import { isUploadFormValid, resetValidator } from './validation.js';
import { resetScale } from './scale-picture.js';
import { showPopupMessage } from './popup-messages.js';
import { removeActiveClass } from './filters.js';

const formElement = document.querySelector('.img-upload__form');
const formSubmitElement = formElement.querySelector('.img-upload__submit');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');

//Блокировка кнопки
const blockSubmitButton = () => {
  formSubmitElement.disabled = true;
  formSubmitElement.textContent = 'Публикую...';
};

//Разблокировка кнопки после отправки формы
const unblockSubmitButton = () => {
  formSubmitElement.disabled = false;
  formSubmitElement.textContent = 'Опубликовать';
};

//функция рендерит поп-ап о успехе
const onSuccess = () => {
  overlayClose();
  unblockSubmitButton();
  showPopupMessage('success');
};

//функция рендерит поп-ап об ошибке
const onError = () => {
  unblockSubmitButton();
  showPopupMessage('error');
};

const setUserFormSubmit = () =>{

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = isUploadFormValid();
    if (isValid) {
      blockSubmitButton();
      sendData (
        evt.target,
        onSuccess,
        onError,
      );
    }
  });
};

const resetForm = () => {
  uploadFileElement.value = '';

  textFieldElements.forEach((field) => {
    field.value = '';
  });

  resetValidator();
  resetScale();
  removeActiveClass();
};

textFieldElements.forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});

export { setUserFormSubmit, resetForm };
