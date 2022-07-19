

//Напишите код, который позволит пользователю редактировать масштаб изображения.
//Кроме визуального применения эффекта необходимо записывать значение в поле формы с масштабом,
//доступное только для чтения, для дальнейшей отправки на сервер.

import {ZOOM_STEP,
  DEFAULT_SCALE_TEXT,
  DEFAULT_SCALE_TRANSFORM,
  MIN_RULE,
  MAX_RULE} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');


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
  const isMax = currentZoom + direction * ZOOM_STEP >= MAX_RULE;
  const isMin = currentZoom + direction * ZOOM_STEP <= MIN_RULE;

  if (isMax) {
    currentZoom = MAX_RULE;
  } else if (isMin) {
    currentZoom = MIN_RULE;
  } else {
    currentZoom += direction * ZOOM_STEP;
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

