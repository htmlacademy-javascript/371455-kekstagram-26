import { isEscapeKey } from './utils.js';

const Z_INDEX = 100;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showPopupMessage = (type) => {
  const statusConfig = {
    'success': successTemplate,
    'error': errorTemplate,
  };

  const template = statusConfig[type];
  const popupElement = template.cloneNode(true);
  const closeElement = popupElement.querySelector(`.${type}__button`);
  popupElement.style.zIndex = Z_INDEX;
  document.body.append(popupElement);

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeStatusPopup();
    }
  };

  const onButtonClick = (evt) => {
    if (evt.target.closest(`.${type}__inner`)) {
      return;
    }
    closeStatusPopup();
  };

  closeElement.addEventListener('click', () => {
    closeStatusPopup();
  });

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onButtonClick);

  function closeStatusPopup() {
    popupElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
    document.removeEventListener('click', onButtonClick);
  }
};

export { showPopupMessage };
