'use strict';

var NAMES = [
  'Иван',
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var QUANTITY_PERSON = 4;

var userDialog = document.querySelector('.setup');
var similarElement = userDialog.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
  .querySelector('.setup-similar-item');

var randomElementArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomWizards = function () {
  var wizards = [];
  for (var i = 0; i < QUANTITY_PERSON; i++) {
    var wizard = {
      name: randomElementArray(NAMES) + ' ' + randomElementArray(SURNAMES),
      coatColor: randomElementArray(COAT_COLORS),
      eyesColor: randomElementArray(EYES_COLORS)
    };
    wizards.push(wizard);
  }
  return wizards;
};

var wizards = randomWizards();

var renderWizard = function (data) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = data.name;
  wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;
  return wizardElement;
};

var appendWizards = function (dataArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(renderWizard(dataArray[i]));
  }
  similarListElement.appendChild(fragment);
};

userDialog.classList.remove('hidden');
similarElement.classList.remove('hidden');
appendWizards(wizards);
