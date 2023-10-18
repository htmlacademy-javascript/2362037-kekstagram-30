const ALL_FOTOS = 25;

const descriptions = [ 'Жил в озерке золотистый карасик',
  'Ласково звали карасика — Васик',
  'Плавал карасик',
  'искал червяков',
  'Сдёргивал мушек с ребячьих крючков',
  'И, пробираясь на щучьи пески,',
  'Ловко с мальками играл в пузырьки',
  'Чаек дразнил он на зорьке огнистой',
  'Спать заходил в камышок негустой',
  'Пока не узнал он',
  'Что он — золотистый',
  'Пока не подумал',
  'Что он — золотой',
  '— Васик! — зовут его ёршики. — Васик!',
  'Может быть, с нами поплаваешь часик?',
  '— Hет! — отвечал он',
  '— Hикак не могу!',
  'Я — золотой',
  'Я себя берегу!',
  'В тине зелёной',
  'В осоке и ряске',
  'Стали тускнеть у карасика глазки…',
  '— Васик! — печалятся отмели',
  '— Васик!...',
  '…Жил в озерке золотистый карасик…'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Белозёров',
  'Бродский',
  'Маяковский',
  'Есенин',
  'Лермонтов',
  'Пушкин',
  'Хлебников',
  'Ахматова',
  'Цветаева',
  'Блок',
  'Маяковский',
  'Мандельштам',
  'Тютчев',
  'Гумилёв',
  'Заболоцкий',
  'Северянин',
  'Целан',
  'Евтушенко',
  'Роджественский',
  'Окуджава',
  'Бальмонт',
  'Пастернак',
  'Фет',
  'Высоцкий',
  'Киплинг',
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const createId = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

const idNumber = createId();
const fotoNumber = createId();
const idAvatarNumber = createId();

const createComments = () => ({
  id: idAvatarNumber(),
  avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg', //eslint-disable-line
  message: messages[getRandomInt(0, messages.length - 1)],
  name: names[getRandomInt(0, names.length - 1)],
});

const createFotoDescription = () => ({
  id: idNumber(),
  url: 'photos/' + fotoNumber() + '.jpg', //eslint-disable-line
  description: descriptions[getRandomInt(0, ALL_FOTOS)],
  likes: getRandomInt(15,200),
  comments: Array.from({length: getRandomInt(0, 30)}, createComments),
});

const userFoto = Array.from({length: ALL_FOTOS}, createFotoDescription);
