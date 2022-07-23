//применение эффекта для изображения

const EFFECTS_OPTION = {
  'chrome' : {
    config: {
      range: {min: 0, max: 1},
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
    getCssFilterValue: (value) => `grayscale(${value})`,
  },

  'sepia': {
    config: {
      range: {min: 0, max: 1},
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
    getCssFilterValue: (value) => `sepia(${value})`,
  },

  'marvin': {
    config: {
      range: {min: 0, max: 100},
      start: 100,
      step: 1,
    },
    getCssFilterValue: (value) => `invert(${value}%)`,
  },

  'phobos': {
    config: {
      range: {min: 0, max: 100},
      start: 100,
      step: 1,
    },
    getCssFilterValue: (value) => `blur(${value}px)`,
  },

  'heat': {
    config: {
      range: {min: 0, max: 3},
      start: 3,
      step: 0.1,
    },
    getCssFilterValue: (value) => `brightness(${value})`,
  },

  'none' : {
    // eslint-disable-next-line no-unused-vars
    getCssFilterValue: (_) => 'none',
  },
};

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

const applyEffect = () =>  {
  // eslint-disable-next-line prefer-const
  for (let effect in EFFECTS_OPTION) {
    if (imgElement.classList.contains(`effects__preview--${effect}`)) {
      imgElement.style.filter = EFFECTS_OPTION[effect].getCssFilterValue(levelEffectElement.value);
      return;
    }
  }
};

const onEffectSliderUpdate = () => {
  for (const effectsItemElement of effectsItemsElement) {
    const effectRadioElement = effectsItemElement.querySelector('.effects__radio');

    levelEffectElement.classList.add('hidden');

    effectRadioElement.addEventListener('click', () => {
      imgElement.className = '';
      imgElement.classList.add(`effects__preview--${effectRadioElement.value}`);

      if (imgElement.className === 'effects__preview--none') {
        levelEffectElement.classList.add('hidden');
        sliderElement.setAttribute('disabled', true);
        imgElement.style.filter = 'none';
      } else {
        levelEffectElement.classList.remove('hidden');
        sliderElement.removeAttribute('disabled');
      }

      // eslint-disable-next-line prefer-const
      for (let effect in EFFECTS_OPTION) {
        if (imgElement.classList.contains(`effects__preview--${effect}`) && typeof EFFECTS_OPTION[effect].config !== 'undefined') {
          sliderElement.noUiSlider.updateOptions(sliderConfig);
          return;
        }
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
  sliderEffectElement.classList.add('hidden');
  imgElement.classList = '';
  imgElement.style.filter = '';
  sliderElement.noUiSlider.destroy();
};

const resetEffects = () => {
  effectsItemsElement[0].querySelector('input').checked = 'checked';
  imgElement.style.filter = 'none';
  imgElement.classList.remove(...imgElement.classList);
  imgElement.classList.add('effects__preview--none');
  sliderElement. noUiSkider.updateOptions({start: 0});
};

turnEffectsOn();

export { turnEffectsOn, turnEffectsOff, resetEffects };
