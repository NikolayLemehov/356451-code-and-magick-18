'use strict';

(function () {
  var similarListElement = window.elementDom.setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');

  var renderWizard = function (data) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;
    return wizardElement;
  };

  window.render = {
    QUANTITY_PERSON: 4,
    appendWizards: function (dataArray) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < dataArray.length; i++) {
        fragment.appendChild(renderWizard(dataArray[i]));
      }
      similarListElement.appendChild(fragment);
    },
  };
})();
