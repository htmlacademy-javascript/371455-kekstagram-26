import { sendData } from './api.js';
import { overlayClose } from './overlay.js';
import { isUploadFormValid, resetValidator } from './validation.js';
import { resetScale } from './scale-picture.js';
import { showPopupMessage } from './popup-messages.js';
import { resetEffects } from './effects.js';
import { body } from './big-picture.js';

const formElement = document.querySelector('.img-upload__form');
const formSubmitElement = formElement.querySelector('.img-upload__submit');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadCancelButton = document.querySelector('.img-upload__cancel');


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

const resetForm = () => {
  overlayClose();
  resetEffects();
  body.classList.remove('modal-open');
  formElement.reset();
  resetValidator();
  resetScale();

  uploadCancelButton.removeEventListener ('click', onFormReset);

  uploadFileElement.value = '';

  textFieldElements.forEach((field) => {
    field.value = '';
  });
};

function onFormReset () {
  resetForm();
}

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
    resetForm();
  });
};

textFieldElements.forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});

export { setUserFormSubmit, resetForm };
