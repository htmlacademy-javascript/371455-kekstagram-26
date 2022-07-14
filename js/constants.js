const POST_COUNT = 25;

const DESCRIPTIONS = [
  'Я поел',
  'Я пошел гулять',
  'Вкусное мясо',
  'Классное небо сегодня',
  'Дай поесть мне!',
  'Кто со мной на озеро?',
  'Вот мои игрушки',
];

const NAMES = [
  'Шарик Мясной',
  'Бобик Лысый',
  'Мурка Леонидовна',
  'Веник Каминный',
  'Черныш Заморский',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Picture = {
  WIDTH: 600,
  HEIGHT: 600,
};

const MAX_HASHTAGS = 5;

const MAX_SYMBOLS = 140;

const COMMENTS_LIMIT = 25;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// const HASHTAG_LENGTH_MIN = 2;

// const HASHTAG_LENGTH_MAX = 20;

const ZOOM_STEP = 25;
const DEFAULT_SCALE_TEXT = '100%';
const DEFAULT_SCALE_TRANSFORM = 1.0;
const MIN_RULE = 25;
const MAX_RULE = 100;

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';

export {POST_COUNT,
  DESCRIPTIONS,
  NAMES,
  MESSAGES,
  Picture,
  MAX_HASHTAGS,
  MAX_SYMBOLS,
  COMMENTS_LIMIT,
  FILE_TYPES,
  ZOOM_STEP,
  DEFAULT_SCALE_TEXT,
  DEFAULT_SCALE_TRANSFORM,
  MAX_RULE,
  MIN_RULE,
  SERVER_URL
};

