'use strict';

(function () {
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
  var rgbFireballColors = window.util.hexToRgbArray(FIREBALL_COLORS);
  var wizard = {
    onEyesChange: function () {
    },
    onCoatChange: function () {
    },
  };

  var setupPlayerElement = window.elementDom.setup.querySelector('.setup-player');

  var setupWizardCoatElement = setupPlayerElement.querySelector('.setup-wizard .wizard-coat');
  setupWizardCoatElement.addEventListener('click', function () {
    var colorPair = window.util.getNextItemArray(getComputedStyle(setupWizardCoatElement).fill, COAT_COLORS, window.util.toCopyArray(COAT_COLORS));
    setupWizardCoatElement.style.fill = colorPair.rgbColor;
    window.elementDom.setup.querySelector('.setup-wizard-form input[name="coat-color"]').value = colorPair.color;
    wizard.onCoatChange(colorPair.color);
  });

  var setupWizardEyesElement = setupPlayerElement.querySelector('.setup-wizard .wizard-eyes');
  setupWizardEyesElement.addEventListener('click', function () {
    var colorPair = window.util.getNextItemArray(getComputedStyle(setupWizardEyesElement).fill, EYES_COLORS, RGB_EYES_COLORS);
    setupWizardEyesElement.style.fill = colorPair.rgbColor;
    window.elementDom.setup.querySelector('.setup-wizard-form input[name="eyes-color"]').value = colorPair.color;
    wizard.onEyesChange(colorPair.color);
  });

  var setupFireballElement = setupPlayerElement.querySelector('.setup-fireball-wrap');
  setupFireballElement.addEventListener('click', function () {
    var colorPair = window.util.getNextItemArray(getComputedStyle(setupFireballElement).backgroundColor, FIREBALL_COLORS, rgbFireballColors);
    setupFireballElement.style.backgroundColor = colorPair.rgbColor;
    setupFireballElement.querySelector('input').value = colorPair.color;
  });

  window.wizard = wizard;
})();
