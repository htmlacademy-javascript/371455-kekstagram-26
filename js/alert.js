const templateMessage = document.querySelector('#message').content.querySelector('.message');
const messageElement = templateMessage.cloneNode(true);
const textElement = messageElement.querySelector('.message__text');
const closeButtonElement = messageElement.querySelector('.message__close');

const showAlertMessage = (message) => {
  textElement.textContent = message;
  document.body.append(messageElement);
};

const onCloseButtonClick = () => {
  messageElement.remove();
};

closeButtonElement.addEventListener('click', onCloseButtonClick);

export { showAlertMessage };
