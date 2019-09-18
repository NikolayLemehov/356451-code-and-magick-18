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

var showElement = function (element) {
  element.classList.remove('hidden');
};
var userDialog = document.querySelector('.setup');
showElement(userDialog);
var similarElement = userDialog.querySelector('.setup-similar');
showElement(similarElement);
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var randomElementArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
var randomWizards = function (names, surnames, coatColors, eyesColors, quantityWizard) {
  var wizards = [];
  for (var i = 0; i < quantityWizard; i++) {
    var wizard = {
      name: randomElementArray(names) + ' ' + randomElementArray(surnames),
      coatColor: randomElementArray(coatColors),
      eyesColor: randomElementArray(eyesColors)
    };
    wizards.push(wizard);
  }
  return wizards;
};
var wizards = randomWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS, QUANTITY_PERSON);
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
