'use strict';

(function () {
  var setup = window.elementDom.setup;
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupCloseBtn = setup.querySelector('.setup-close');
  var setupUserNameInput = setup.querySelector('.setup-user-name');
  var originCoords = {
    x: getComputedStyle(setup).left,
    y: getComputedStyle(setup).top,
  };

  var openPopupSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', pressEscSetupPopupHandler);
  };

  var closePopupSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', pressEscSetupPopupHandler);
    setup.style.left = originCoords.x;
    setup.style.top = originCoords.y;
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

  var dialogHandle = setup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    var dragged = false;
    var moveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };
    var upMouseHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', upMouseHandler);
      if (dragged) {
        var preventDefaultClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', preventDefaultClickHandler);
        };
        dialogHandle.addEventListener('click', preventDefaultClickHandler);
      }
    };
    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', upMouseHandler);
  });
})();
