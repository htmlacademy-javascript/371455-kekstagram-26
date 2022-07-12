import {MAX_HASHTAGS,
  MAX_SYMBOLS} from './constants.js';

//валидация формы
const reHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const getHashtag = (string) => string.trim().toLowerCase().split(' ');

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-text-error' ,
});

const isHashtagUnique = (value) => {
  const hashtags = getHashtag(value);
  const set = new Set(hashtags );
  return (set.size === hashtags .length);
};

const isValidHashtagLength = (value) => {
  const hashtagLength = getHashtag(value).length;
  return hashtagLength <= MAX_HASHTAGS;
};

const isValidHashtag = (value) => {
  const hashtags = getHashtag(value);
  return hashtags.every((item) => reHashtag.test(item));
};

pristine.addValidator(hashtagInput, (value) => isValidHashtagLength(value), `Не более ${MAX_HASHTAGS} хештегов`);
pristine.addValidator(hashtagInput, (value) => isValidHashtag (value), 'Хештег должен содержать только буквы и цифры, хештег не может быть менее 1 символа и более 20');
pristine.addValidator(hashtagInput, (value) => isHashtagUnique(value), 'Хештеги должны быть уникальными');
pristine.addValidator(commentField, (value) => value.length <= MAX_SYMBOLS, `Комментарий не может быть больше ${MAX_SYMBOLS} символов`);

const isUploadFormValid = () => pristine.validate();

const onFormSubmit = (evt) => {
  if(!isUploadFormValid()) {
    evt.preventDefault();
  }
};

uploadForm.addEventListener('submit', onFormSubmit);

uploadForm.addEventListener('reset', () => {
  pristine.reset();
});

export {isUploadFormValid,
  onFormSubmit};

