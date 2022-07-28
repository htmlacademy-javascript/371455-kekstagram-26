import { sendData } from './api.js';
import { isUploadFormValid, resetValidator } from './validation.js';
import { resetScale } from './scale-picture.js';
import { showPopupMessage } from './popup-messages.js';
import { resetEffects } from './effects.js';
import { body } from './big-picture.js';
import { isEscapeKey } from './utils.js';

const formElement = document.querySelector('.img-upload__form');
const formSubmitElement = formElement.querySelector('.img-upload__submit');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');

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

const openOverlay = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onOverlayEscKeydown);
};

const closeOverlay = () => {
  overlay.classList.add('hidden');
};

//Сброс формы загрузки фото
const resetForm = () => {
  body.classList.remove('modal-open');
  formElement.reset();
  resetValidator();
  resetScale();
  resetEffects();
  uploadFileElement.value = '';
  textFieldElements.forEach((field) => {
    field.value = '';
  });
};

function onOverlayEscKeydown(evt) {
  const hasErrorPopup = document.querySelector('.error');
  if (isEscapeKey(evt) && !hasErrorPopup) {
    evt.preventDefault();
    closeOverlay();
    resetForm();
    document.removeEventListener('keydown', onOverlayEscKeydown);
  }
}

uploadCancelButton.addEventListener('click', () => {
  closeOverlay();
  resetForm();
  document.removeEventListener('keydown', onOverlayEscKeydown);
});

//функция рендерит поп-ап о успехе
const onSuccess = () => {
  closeOverlay();
  unblockSubmitButton();
  showPopupMessage('success');
  resetForm();
  document.addEventListener('keydown', onOverlayEscKeydown);
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
      sendData(
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

export { setUserFormSubmit, resetForm, openOverlay };
