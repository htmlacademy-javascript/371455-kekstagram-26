/* В этом задании мы продолжим реализацию сценария загрузки изображения и его редактирования на примере заглушки.

Напишите код, который позволит пользователю редактировать масштаб изображения.Кроме визуального применения эффекта необходимо
записывать значение в поле формы с масштабом, доступное только для чтения, для дальнейшей отправки на сервер.

С помощью полученных обновлений (стили и скрипты, необходимые для noUiSlider) от Кексобота реализуйте применение
эффекта для изображения. Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей
отправки на сервер.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния,
т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.*/


// хочу как то встроить эту констатнку - выглядит как бдуто будет удобнее и меньше кода


// const EffectsOption = {
//   CHROME : {
//     STEP: 0.1,
//     MAX: 1,
//     getCssFilterValue: (value) => `grayscale(${value})`,
//   },
//   SEPIA: {
//     STEP: 0.1,
//     MAX: 1,
//     getCssFilterValue: (value) => `sepia(${value})`,
//   },
//   MARVIN: {
//     STEP: 1,
//     MAX: 100,
//     getCssFilterValue: (value) => `invert(${value}%)`,
//   },
//   PHOBOS: {
//     STEP: 0.1,
//     MAX: 3,
//     getCssFilterValue: (value) => `blur(${value}px)`,
//   },
//   HEAT: {
//     STEP: 0.1,
//     MAX: 3,
//     getCssFilterValue: (value) => `brightness(${value})`,
//   },
//   ORIGINAL : {
//     getCssFilterValue: () => 'none',
//   },
// };


const uploadForm = document.querySelector('.img-upload__form');
const imgElement = uploadForm.querySelector('.img-upload__preview img');
const effectsListElement = uploadForm.querySelector('.effects__list');
const effectsItemsElement = effectsListElement.querySelectorAll('.effects__item');
const sliderEffectElement = uploadForm.querySelector('.effect-level');
const levelEffectElement = sliderEffectElement.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

// Инициализировать слайдер
const sliderConfig = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

noUiSlider.create(sliderElement, sliderConfig);

// надо как то упростить
const applyEffect = () =>  {
  if (imgElement.classList.contains('effects__preview--none')) {
    imgElement.style.filter = 'none';
  }

  else if (imgElement.classList.contains('effects__preview--chrome')) {
    imgElement.style.filter = `grayscale(${levelEffectElement.value})`;
  }

  else if (imgElement.classList.contains('effects__preview--sepia')) {
    imgElement.style.filter = `sepia(${levelEffectElement.value})`;
  }

  else if (imgElement.classList.contains('effects__preview--marvin')) {
    imgElement.style.filter = `invert(${levelEffectElement.value}%)`;
  }

  else if (imgElement.classList.contains('effects__preview--phobos')) {
    imgElement.style.filter = `blur(${levelEffectElement.value}px)`;
  }

  else if (imgElement.classList.contains('effects__preview--heat')) {
    imgElement.style.filter = `brightness(${levelEffectElement.value})`;
  }
};

// let currentFilter = 'none';
// imgElement.classList.remove(`someClass${currentFilter}`); // для  none этого не требуется, так как у него нету фильтра, это просто для примера
// currentFilter = newFilter; // получаем значение при переключении фильтров и событию `change`
// imgElement.classList.add(`someClass${currentFilter}`);


//тоже надо что то с этим сделать
const onEffectSliderUpdate = () => {

  for (const effectsItemElement of effectsItemsElement) {
    const effectRadioElement = effectsItemElement.querySelector('.effects__radio');

    levelEffectElement.classList.add('hidden');

    effectRadioElement.addEventListener('click', () => {
      imgElement.className = '';
      imgElement.classList.add(`effects__preview--${effectRadioElement.value}`);

      if (imgElement.className === 'effects__preview--chrome' || imgElement.className === 'effects__preview--sepia') {
        levelEffectElement.classList.remove('hidden');
        sliderElement.removeAttribute('disabled');
        sliderElement.noUiSlider.updateOptions(sliderConfig);

      }

      else if (imgElement.className === 'effects__preview--marvin') {
        levelEffectElement.classList.remove('hidden');
        sliderElement.removeAttribute('disabled');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100, // в SliderCOnfig тут 1
          step: 1, // а тут 0.1
        });
      }

      else if (imgElement.className === 'effects__preview--phobos') {
        levelEffectElement.classList.remove('hidden');
        sliderElement.removeAttribute('disabled');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }

      else if (imgElement.className === 'effects__preview--heat') {
        levelEffectElement.classList.remove('hidden');
        sliderElement.removeAttribute('disabled');
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
      }

      else if (imgElement.className === 'effects__preview--none') {
        levelEffectElement.classList.add('hidden');
        sliderElement.setAttribute('disabled', true);
        imgElement.style.filter = 'none';
      }
    });
  }
};

const turnEffectsOn = () => {

  sliderElement.noUiSlider.on('update', () => {
    levelEffectElement.value = sliderElement.noUiSlider.get();
    applyEffect();
  });

  onEffectSliderUpdate();

};

const turnEffectsOff = () => {
  imgElement.style.transform = '';
  imgElement.style.filter = 'none';
  imgElement.className = 'effects__preview--none';

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

turnEffectsOn();


export {turnEffectsOn, turnEffectsOff};
