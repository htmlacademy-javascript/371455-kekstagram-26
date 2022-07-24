// применение эффекта для изображения

const EFFECTS_OPTION = {
  'effect-none': {
    filter: 'none',
    unit: '',
    class: '',
    noUiSlider: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0
    }
  },
  'effect-chrome': {
    filter: 'grayscale',
    unit: '',
    class: 'chrome',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }
  },
  'effect-sepia': {
    filter: 'sepia',
    unit: '',
    class: 'sepia',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-marvin': {
    filter: 'invert',
    unit: '%',
    class: 'marvin',
    noUiSlider: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    }
  },
  'effect-phobos': {
    filter: 'blur',
    unit: 'px',
    class: 'phobos',
    noUiSlider: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  },
  'effect-heat': {
    filter: 'brightness',
    unit: '',
    class: 'heat',
    noUiSlider: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  }
};

const sliderEffectElement = document.querySelector('.effect-level');
const sliderElement = sliderEffectElement.querySelector('.effect-level__slider');
const levelEffectElement = sliderEffectElement.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');
const imgElement = document.querySelector('.img-upload__preview img');

sliderEffectElement.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => (
      parseFloat(value)
    ),
  }
});

const onEffectsList = (evt) => {
  imgElement.classList = '';
  if (evt.target.id === 'effect-none') {
    sliderEffectElement.classList.add('hidden');
    imgElement.style.filter = 'none';
  } else {
    sliderEffectElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(EFFECTS_OPTION[evt.target.id].noUiSlider);
    imgElement.classList.add(`effects__preview--${EFFECTS_OPTION[evt.target.id].class}`);
  }
};

const resetEffects = () => {
  sliderEffectElement.classList.add('hidden');
  imgElement.style.filter = 'none';
};

sliderElement.noUiSlider.on('update', () => {
  const selectedFilter = effectsListElement.querySelector('input:checked').id;
  const sliderValue = sliderElement.noUiSlider.get();
  levelEffectElement.value = sliderValue;
  imgElement.style.filter = `${EFFECTS_OPTION[selectedFilter].filter}(${sliderValue}${EFFECTS_OPTION[selectedFilter].unit})`;
});

effectsListElement.addEventListener('change', onEffectsList);

export { resetEffects };
