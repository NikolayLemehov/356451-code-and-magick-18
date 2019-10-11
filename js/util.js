'use strict';

(function () {
  window.util = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getMaxElement: function (arr) {
      var maxElement = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    randomElementArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    toCopyArray: function (array) {
      var copyArray = [];
      for (var i = 0; i < array.length; i++) {
        copyArray[i] = array[i];
      }
      return copyArray;
    },
    hexToRgb: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 'rgb(' + parseInt(result[1], 16) +
        ', ' + parseInt(result[2], 16) +
        ', ' + parseInt(result[3], 16) + ')' : null;
    },
    hexToRgbArray: function (hexArray) {
      var rbgArray = [];
      for (var i = 0; i < hexArray.length; i++) {
        rbgArray[i] = this.hexToRgb(hexArray[i]);
      }
      return rbgArray;
    },
    getNextItemArray: function (presentItem, array, rgbArray) {
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
    },
  };
})();
