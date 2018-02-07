'use strict';

var ADVERT_AVATAR = [
  '01', '02', '03', '04', '05', '06', '07', '08'];
var ADVERT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'
];
var ADVERT_TYPE = ['flat', 'house', 'bungalo'];
var ADVERT_FUTUTRE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADVERT_TIME = ['12:00', '13:00', '14:00'];


var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;

function getRandomTime(arrTimes) {
  return arrTimes[Math.floor(Math.random() * arrTimes.lenght)];
}
function getUniqueValue(arrValues) {
  return arrValues.splice(randomInteger(0, arrValues.length - 1), 1)[0];
}
function randomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getRandomArray(arrValues) {
  var sourceValues = arrValues.slice();
  var randomArrayLength = randomInteger(1, sourceValues.length);
  var newArray = [];
  for (var i = 0; i < randomArrayLength; i++) {
    newArray[i] = getUniqueValue(sourceValues);
  }
  return newArray;
}

var advert = [];
for (var i = 0; i < 8; i++) {
  var addressX = randomInteger(300, 900);
  var addressY = randomInteger(150, 500);

  advert[i] = {
    author: {
      avatar: 'img/avatars/user' + getUniqueValue(ADVERT_AVATAR) + '.png'
    },
    offer: {
      title: getUniqueValue(ADVERT_TITLE),
      address: addressX + ' ,' + addressY,
      price: randomInteger(1000, 1000000),
      type: getRandomTime(ADVERT_TYPE),
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 50),
      checkin: getRandomTime(ADVERT_TIME),
      checkout: getRandomTime(ADVERT_TIME),
      feature: getRandomArray(ADVERT_FUTUTRE),
      description: ' ',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: addressX,
      y: addressY
    }
  }; 
}
console.log(getRandomTime.lenght)

// 3, 4
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsOnMap = map.querySelector('.map__pins');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

for (i = 0; i < 8; i++) {
  var template = pinsTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();


  template.setAttribute('style', 'left: ' + (advert[i].location.x + PIN_WIDTH / 2) + 'px; top: ' + (advert[i].location.y + PIN_HEIGHT) + 'px');
  template.querySelector('img').setAttribute('src', advert[i].author.avatar);

  fragment.appendChild(template);
  pinsOnMap.appendChild(fragment);
}
var elemBefore = document.querySelector('.map__filters-container');

var elemParent = document.querySelector('.map');
var elem = document.createElement('div');
elem.className = 'new_map__card';
elemParent.insertBefore(elem, elemBefore);

var articleTemplatePopup = document.querySelector('template').content.querySelector('article.map__card');
var articlePopup = articleTemplatePopup.cloneNode(true);

var fragmentPopup = document.createDocumentFragment();
fragmentPopup.appendChild(articlePopup);

elem.appendChild(fragmentPopup);

articlePopup.querySelector('h3').textContent = advert[0].offer.title;

// заменили адрес
articlePopup.querySelector('small').textContent = advert[0].offer.address;

// заменили цену
articlePopup.querySelector('.popup__price').textContent = advert[0].offer.price + ' Р/ночь';

// заменили тип жилья
articlePopup.querySelector('h4').textContent = [advert[0].offer.type];

// заменили количества комнат и гостей, nth-child не работает
articlePopup.querySelector('p:nth-of-type(3)').textContent = advert[0].offer.rooms + ' комнаты для ' + advert[0].offer.guests + ' гостей';

// заменили время приезда-выезда
articlePopup.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advert[0].offer.checkin + ', выезд до ' + advert[0].offer.checkout;

// заменили удобства
var articlePopupFeatures = articlePopup.querySelector('.popup__features');

for (i = 0; i < 6; i++) {
  articlePopupFeatures.removeChild(articlePopup.querySelector('li'));
}

for (i = 0; i < advert[0].offer.feature.length; i++) {
  var li = document.createElement('li');
  li.className = 'feature feature--' + advert[0].offer.feature[i];
  articlePopupFeatures.appendChild(li);
}
// заменили описание
articlePopup.querySelector('p:nth-of-type(5)').textContent = advert[0].offer.description;

// добавили фотографии
var popupPhoto = articlePopup.querySelector('.popup__pictures');

for (i = 0; i < 3; i++) {
  var popupPhotoCopy = popupPhoto.querySelector('li').cloneNode(true);
  popupPhoto.appendChild(popupPhotoCopy);

  popupPhoto.querySelector('img').setAttribute('src', advert[0].offer.photos[i]);
  popupPhoto.querySelector('img').setAttribute('width', '35px');
  popupPhoto.querySelector('img').setAttribute('heigth', '30px');
}


// заменили аватар
articlePopup.querySelector('img').setAttribute('src', advert[0].author.avatar);
