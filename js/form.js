import { sendData } from './api.js';
import { isUploadFormValid, resetValidator } from './validation.js';
import { resetScale } from './scale-picture.js';
import { showPopupMessage } from './popup-messages.js';
import { resetEffects } from './effects.js';
import { body } from './big-picture.js';
import {isEscapeKey} from './util.js';

const formElement = document.querySelector('.img-upload__form');
const formSubmitElement = formElement.querySelector('.img-upload__submit');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const imgElement = formElement.querySelector('.img-upload__preview img');

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

const overlayOpen = () => {
  overlay.classList.remove('hidden');
};

const overlayClose = () => {
  overlay.classList.add('hidden');
};

const resetForm = () => {
  body.classList.remove('modal-open');
  formElement.reset();
  resetValidator();
  resetScale();
  resetEffects();

  uploadFileElement.value = '';
  imgElement.src =
  textFieldElements.forEach((field) => {
    field.value = '';
  });
};

const onOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlayClose();
    resetForm();
  }
};

uploadCancelButton.addEventListener('click', () => {
  overlayClose();
  resetForm();
});

document.addEventListener('keydown', onOverlayEscKeydown);

//функция рендерит поп-ап о успехе
const onSuccess = () => {
  overlayClose();
  unblockSubmitButton();
  showPopupMessage('success');
  resetForm();
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

textFieldElements.forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});

export { setUserFormSubmit, resetForm, overlayOpen };
