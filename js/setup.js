'use strict';

(function () {
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
    'rgb(0, 0, 0)',
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];
  var RGB_EYES_COLORS = [
    'rgb(0, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(0, 128, 0)',
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];
  var QUANTITY_PERSON = 4;

  var hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 'rgb(' + parseInt(result[1], 16) +
      ', ' + parseInt(result[2], 16) +
      ', ' + parseInt(result[3], 16) + ')' : null;
  };

  var hexToRgbArray = function (hexArray) {
    var rbgArray = [];
    for (var i = 0; i < hexArray.length; i++) {
      rbgArray[i] = hexToRgb(hexArray[i]);
    }
    return rbgArray;
  };

  var rgbFireballColors = hexToRgbArray(FIREBALL_COLORS);

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
    if (evt.keyCode === window.util.ESC_KEYCODE && evt.target !== setupUserNameInput) {
      closePopupSetup();
    }
  };

  setupOpenBtn.addEventListener('click', function () {
    openPopupSetup();
  });

  setupOpenBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopupSetup();
    }
  });

  setupCloseBtn.addEventListener('click', function () {
    closePopupSetup();
  });

  setupCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
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

  var getNextItemArray = function (presentItem, array, rgbArray) {
    for (var i = 0; i < array.length; i++) {
      if (presentItem === rgbArray[i] && i < array.length - 1) {
        return {
          color: array[i + 1],
          rgbColor: rgbArray[i + 1],
        };
      }
    }
    return {
      color: array[0],
      rgbColor: rgbArray[0],
    };
  };

  setupWizardCoatElement.addEventListener('click', function () {
    var colorPair = getNextItemArray(getComputedStyle(setupWizardCoatElement).fill, COAT_COLORS, toCopyArray(COAT_COLORS));
    setupWizardCoatElement.style.fill = colorPair.rgbColor;
    setupElement.querySelector('.setup-wizard-form input[name="coat-color"]').value = colorPair.color;
  });

  setupWizardEyesElement.addEventListener('click', function () {
    var colorPair = getNextItemArray(getComputedStyle(setupWizardEyesElement).fill, EYES_COLORS, RGB_EYES_COLORS);
    setupWizardEyesElement.style.fill = colorPair.rgbColor;
    setupElement.querySelector('.setup-wizard-form input[name="eyes-color"]').value = colorPair.color;
  });

  setupFireballElement.addEventListener('click', function () {
    var colorPair = getNextItemArray(getComputedStyle(setupFireballElement).backgroundColor, FIREBALL_COLORS, rgbFireballColors);
    setupFireballElement.style.backgroundColor = colorPair.rgbColor;
    setupFireballElement.querySelector('input').value = colorPair.color;
  });

  similarElement.classList.remove('hidden');
  appendWizards(wizards);
})();
