import { sendData } from './api.js';
import { overlayClose } from './overlay';
import { isUploadFormValid, resetValidator } from './validation';
import { resetScale } from './scale-picture.js';

const formElement = document.querySelector('.img-upload__form');
const formSubmitElement = formElement.querySelector('.img-upload__submit');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');

const resetForm = () => {
  uploadFileElement.value = '';

  textFieldElements.forEach((field) => {
    field.value = '';
  });

  resetValidator();
  resetScale();
};


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


const setUserFormSubmit = (onSuccess) =>{

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = isUploadFormValid();
    if (isValid) {
      sendData (
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
          overlayClose();
        },
        new FormData(evt.target),
      );
    }
    blockSubmitButton();
  });
};

setUserFormSubmit(overlayClose);


textFieldElements.forEach((field) => {
  field.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
});

export { setUserFormSubmit, resetForm };
