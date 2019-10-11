'use strict';

(function () {
  var serverHandler = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 2000; // 2s
  };
  window.backend = {
    load: function (onError, onSuccess) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      serverHandler(xhr, onSuccess, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onError, onSuccess) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      serverHandler(xhr, onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },
  };
})();

