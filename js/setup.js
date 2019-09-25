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
  'Вашингтон',
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
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
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];
var QUANTITY_PERSON = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupElement = document.querySelector('.setup');
var similarElement = setupElement.querySelector('.setup-similar');
var similarListElement = setupElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
  .querySelector('.setup-similar-item');
var setupOpenBtn = document.querySelector('.setup-open');
var setupCloseBtn = setupElement.querySelector('.setup-close');
var setupUserNameInput = setupElement.querySelector('.setup-user-name');
var setupWizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
var setupFireballElement = setupElement.querySelector('.setup-fireball-wrap');

var randomElementArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var convertColorToRgbInArray = function (colors) {
  var bodyElement = document.querySelector('body');
  var color = '';
  var rgbColors = [];
  var element = document.createElement('div');
  element.classList.add('temporary-test-element');
  element.style.display = 'none';
  bodyElement.appendChild(element);
  for (var i = 0; i < colors.length; i++) {
    element.style.fill = colors[i];
    color = getComputedStyle(element).fill;
    rgbColors[i] = color;
  }
  element.remove();
  return rgbColors;
};

var randomWizards = function () {
  var wizards = [];
  for (var i = 0; i < QUANTITY_PERSON; i++) {
    var wizard = {
      name: randomElementArray(NAMES) + ' ' + randomElementArray(SURNAMES),
      coatColor: randomElementArray(COAT_COLORS),
      eyesColor: randomElementArray(EYES_COLORS),
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

var openPopupSetup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', pressEscSetupPopupHandler);
};

var closePopupSetup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', pressEscSetupPopupHandler);
};

var pressEscSetupPopupHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserNameInput) {
    closePopupSetup();
  }
};

setupOpenBtn.addEventListener('click', function () {
  openPopupSetup();
});

setupOpenBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopupSetup();
  }
});

setupCloseBtn.addEventListener('click', function () {
  closePopupSetup();
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopupSetup();
  }
});

var toCopyArray = function (array) {
  var copyArray = [];
  for (var i = 0; i < array.length; i++) {
    copyArray[i] = array[i];
  }
  return copyArray;
};

var getNextItemArray = function (presentItem, array) {
  var translateArray = (array[0].startsWith('rgb(') && array[0].endsWith(')')) ? toCopyArray(array) : convertColorToRgbInArray(array);
  for (var i = 0; i < array.length; i++) {
    if (presentItem === translateArray[i] && i < array.length - 1) {
      return array[i + 1];
    }
  }
  return array[0];
};

setupWizardCoatElement.addEventListener('click', function () {
  var color = getNextItemArray(getComputedStyle(setupWizardCoatElement).fill, COAT_COLORS);
  setupWizardCoatElement.style.fill = color;
  setupElement.querySelector('.setup-wizard-form input[name="coat-color"]').value = color;
});

setupWizardEyesElement.addEventListener('click', function () {
  var color = getNextItemArray(getComputedStyle(setupWizardEyesElement).fill, EYES_COLORS);
  setupWizardEyesElement.style.fill = color;
  setupElement.querySelector('.setup-wizard-form input[name="eyes-color"]').value = color;
});

setupFireballElement.addEventListener('click', function () {
  var color = getNextItemArray(getComputedStyle(setupFireballElement).backgroundColor, FIREBALL_COLORS);
  setupFireballElement.style.backgroundColor = color;
  setupFireballElement.querySelector('input').value = color;
});

similarElement.classList.remove('hidden');
appendWizards(wizards);
