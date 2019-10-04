'use strict';

(function () {
  // var NAMES = [
  //   'Иван',
  //   'Иван',
  //   'Хуан Себастьян',
  //   'Мария',
  //   'Кристоф',
  //   'Виктор',
  //   'Юлия',
  //   'Люпита',
  //   'Вашингтон',
  // ];
  // var SURNAMES = [
  //   'да Марья',
  //   'Верон',
  //   'Мирабелла',
  //   'Вальц',
  //   'Онопко',
  //   'Топольницкая',
  //   'Нионго',
  //   'Ирвинг',
  // ];
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
  var rgbFireballColors = window.util.hexToRgbArray(FIREBALL_COLORS);

  // var similarElement = window.elementDom.setup.querySelector('.setup-similar');
  var formElement = window.elementDom.setup.querySelector('.setup-wizard-form');
  var similarListElement = formElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
  var setupWizardCoatElement = formElement.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyesElement = formElement.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballElement = formElement.querySelector('.setup-fireball-wrap');

  // var randomWizards = function () {
  //   var wizards = [];
  //   for (var i = 0; i < QUANTITY_PERSON; i++) {
  //     var wizard = {
  //       name: window.util.randomElementArray(NAMES) + ' ' + window.util.randomElementArray(SURNAMES),
  //       coatColor: window.util.randomElementArray(COAT_COLORS),
  //       eyesColor: window.util.randomElementArray(EYES_COLORS),
  //     };
  //     wizards.push(wizard);
  //   }
  //   return wizards;
  // };

  // var wizards = randomWizards();

  var renderWizard = function (data) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;
    return wizardElement;
  };

  var appendWizards = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataArray.length; i++) {
      fragment.appendChild(renderWizard(dataArray[i]));
    }
    similarListElement.appendChild(fragment);
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
    var colorPair = getNextItemArray(getComputedStyle(setupWizardCoatElement).fill, COAT_COLORS, window.util.toCopyArray(COAT_COLORS));
    setupWizardCoatElement.style.fill = colorPair.rgbColor;
    window.elementDom.setup.querySelector('.setup-wizard-form input[name="coat-color"]').value = colorPair.color;
  });

  setupWizardEyesElement.addEventListener('click', function () {
    var colorPair = getNextItemArray(getComputedStyle(setupWizardEyesElement).fill, EYES_COLORS, RGB_EYES_COLORS);
    setupWizardEyesElement.style.fill = colorPair.rgbColor;
    window.elementDom.setup.querySelector('.setup-wizard-form input[name="eyes-color"]').value = colorPair.color;
  });

  setupFireballElement.addEventListener('click', function () {
    var colorPair = getNextItemArray(getComputedStyle(setupFireballElement).backgroundColor, FIREBALL_COLORS, rgbFireballColors);
    setupFireballElement.style.backgroundColor = colorPair.rgbColor;
    setupFireballElement.querySelector('input').value = colorPair.color;
  });

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), errorHandler, function () {
      window.elementDom.setup.classList.add('hidden');
    });
  });

  var successHandler = function (wizards) {
    appendWizards(wizards.slice(0, QUANTITY_PERSON));
    window.elementDom.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // similarElement.classList.remove('hidden');
  // appendWizards(wizards);
  window.backend.load(errorHandler, successHandler);
})();
