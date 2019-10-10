'use strict';

(function () {
  var formElement = window.elementDom.setup.querySelector('.setup-wizard-form');
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), errorHandler, function () {
      window.elementDom.setup.classList.add('hidden');
    });
  });

  var successHandler = function (wizards) {
    window.render.appendWizards(wizards.slice(0, window.render.QUANTITY_PERSON));
    window.elementDom.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute;' +
      ' left: 0; right: 0; font-size: 30px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // similarElement.classList.remove('hidden');
  // appendWizards(wizards);
  window.backend.load(errorHandler, successHandler);
})();
