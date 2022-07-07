import {MAX_HASHTAGS,
  MAX_SYMBOLS,
  HASHTAG_LENGTH_MIN,
  HASHTAG_LENGTH_MAX} from './constants.js';

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

commentField.addEventListener('input', () => {

  const commentFieldText = commentField.value;

  if (commentFieldText.length > MAX_SYMBOLS) {
    commentField.setCustomValidity('Комментарий не более 140 символов');
  } else {
    commentField.setCustomValidity('');
  }
});


pristine.addValidator(hashtagInput, (value) => getHashtag(value).length <= MAX_HASHTAGS, `Не более ${MAX_HASHTAGS} хештегов`);
pristine.addValidator(hashtagInput, (value) => getHashtag(value).every((item) => item.startsWith('#')), 'Хештег начинается с символа #');
pristine.addValidator(hashtagInput, (value) => getHashtag(value).every((item) => item.length >= HASHTAG_LENGTH_MIN && item.length <= HASHTAG_LENGTH_MAX), `Максимальная длина хештега ${HASHTAG_LENGTH_MAX} символов, минимальная длина ${HASHTAG_LENGTH_MIN} символа`);
pristine.addValidator(hashtagInput, (value) => getHashtag(value).every((item) => reHashtag.test(item)), 'Хештег должен содержать только буквы и цифры');
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

