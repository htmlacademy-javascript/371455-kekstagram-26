const ZOOM_STEP = 25;
const DEFAULT_SCALE_TEXT = '100%';
const DEFAULT_SCALE_TRANSFORM = 1.0;
const MIN_RULE = 25;
const MAX_RULE = 100;

const uploadForm = document.querySelector('.img-upload__form');


const zoomOutElement = uploadForm.querySelector('.scale__control--smaller');
const zoomInElement = uploadForm.querySelector('.scale__control--bigger');
const zoomValueElement = uploadForm.querySelector('.scale__control--value');
const imgElement = uploadForm.querySelector('.img-upload__preview img');

//Default image scale values
const resetScale = () => {
  zoomValueElement.value = DEFAULT_SCALE_TEXT;
  imgElement.style.transform = DEFAULT_SCALE_TRANSFORM;
};

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

export { resetScale };
