//2.1. Масштаб:

//При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно
// изменяться значение поля .scale__control--value;
// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%,
//после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%,
//минимальное — 25%. Значение по умолчанию — 100%;
//При изменении значения поля .scale__control--value изображению внутри .img-upload__preview
//должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.
//Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

//Напишите код, который позволит пользователю редактировать масштаб изображения.
//Кроме визуального применения эффекта необходимо записывать значение в поле формы с масштабом,
//доступное только для чтения, для дальнейшей отправки на сервер.

import {ZOOM_STEP,
  DEFAULT_SCALE_TEXT,
  DEFAULT_SCALE_TRANSFORM,
  MIN_RULE,
  MAX_RULE} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');

//const zoomController = (uploadForm) => {};
const zoomOutElement = uploadForm.querySelector('.scale__control--smaller');
const zoomInElement = uploadForm.querySelector('.scale__control--bigger');
const zoomValueElement = uploadForm.querySelector('.scale__control--value');
const imgElement = uploadForm.querySelector('.img-upload__preview img');
//Default image scale values
zoomValueElement.value = DEFAULT_SCALE_TEXT;
imgElement.style.transform = DEFAULT_SCALE_TRANSFORM;

const onScaleChange = (scaleValue) => {

  imgElement.style.transform = `scale(${scaleValue / 100})`;
  zoomValueElement.value = `${scaleValue}%`;
};


const zoom = (direction=1) => {
  let currentZoom = Number(zoomValueElement.value.replace('%',''));
  if (currentZoom + direction*ZOOM_STEP >= MAX_RULE) {
    currentZoom = MAX_RULE;
  } else if (currentZoom + direction*ZOOM_STEP <= MIN_RULE){
    currentZoom = MIN_RULE;
  } else {
    currentZoom += direction*ZOOM_STEP;
  }
  onScaleChange (currentZoom);
};

zoomOutElement.addEventListener('click', () => {
  zoom(-1);
});

zoomInElement.addEventListener('click', () => {
  zoom(1);
});

export {zoom};

