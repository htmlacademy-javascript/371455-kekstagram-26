
//валидация формы

const MAX_HASHTAGS = 5;

const MAX_SYMBOLS = 140;

const ErrorMessages = {
  COMMENT_LENGHT: `Комментарий не может составлять больше ${MAX_SYMBOLS} символов`,
  UNIQUE_HASHTAG: 'Хэш-тег не может быть использован дважды',
  HASHTAG_MAX_NUMBER: `Не более ${MAX_HASHTAGS} хештегов`,
  WRONG_MESSAGE: 'Хэштеги не соответствуют формату'
};

const reHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const getHashtags = () => hashtagInput.value.split(' ').filter(Boolean);

// Пристин
const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-text-error' ,
});

const resetValidator = () => {
  pristine.reset();
};

const isHashtagUnique = (value) => {
  const hashtags = getHashtags(value);
  const set = new Set(hashtags );
  return (set.size === hashtags .length);
};

const isValidHashtagLength = (value) => {
  const hashtagLength = getHashtags(value).length;
  return hashtagLength <= MAX_HASHTAGS;
};

const isValidHashtag = (value) => reHashtag.test(value);
const isAllHashtagsValid = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => isValidHashtag(hashtag));
};

pristine.addValidator(hashtagInput, isAllHashtagsValid, ErrorMessages.WRONG_MESSAGE);
pristine.addValidator(hashtagInput, (value) => isValidHashtagLength(value), ErrorMessages.HASHTAG_MAX_NUMBER);
pristine.addValidator(hashtagInput, (value) => isHashtagUnique(value), ErrorMessages.UNIQUE_HASHTAG);
pristine.addValidator(commentField, (value) => value.length <= MAX_SYMBOLS, ErrorMessages.COMMENT_LENGHT);

const isUploadFormValid = () => pristine.validate();

const onFormSubmit = (evt) => {
  if(!isUploadFormValid()) {
    evt.preventDefault();
  }
};

uploadForm.addEventListener('submit', onFormSubmit);

uploadForm.addEventListener('reset', () => {
  resetValidator();
});

export { resetValidator, isUploadFormValid };
