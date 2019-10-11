'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');

  var renderWizard = function (data) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;
    return wizardElement;
  };
  var QUANTITY_PERSON = 4;
  var similarElement = window.elementDom.setup.querySelector('.setup-similar');
  var similarListElement = window.elementDom.setup.querySelector('.setup-similar-list');

  window.render = {
    appendWizards: function (dataArray) {
      var fragment = document.createDocumentFragment();
      var takeNumber = dataArray.length > QUANTITY_PERSON ? QUANTITY_PERSON : dataArray.length;
      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(renderWizard(dataArray[i]));
      }
      similarListElement.innerHTML = '';
      similarListElement.appendChild(fragment);
      similarElement.classList.remove('hidden');
    },
  };
})();
