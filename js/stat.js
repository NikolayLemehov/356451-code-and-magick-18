'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var BAR_WIDTH = 40;
  var MAX_BAR_HEIGHT = 140;
  var SPACE_BETWEEN_COLUMN = 50;
  var MARGIN_LEFT_DIAGRAM = 40;
  var BLACK_COLOR = 'rgba(0, 0, 0, 1)';
  var TRANSPARENT_BLACK_COLOR = 'rgba(0, 0, 0, 0.7)';
  var WHITE_COLOR = '#ffffff';
  var RED_COLOR = 'rgba(255, 0, 0, 1)';
  var HSL_HUE_OTHER_PLAYER = 240;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getRandomColor = function (hslHue) {
    return 'hsl(' + hslHue + ', ' + (Math.random() * 100) + '%, 50%)';
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, TRANSPARENT_BLACK_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);

    ctx.fillStyle = BLACK_COLOR;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

    var maxTime = window.util.getMaxElement(times);
    var positionColumnX = 0;
    var heightBar = 0;
    var barY = 0;
    var bottomCloud = CLOUD_Y + CLOUD_HEIGHT;

    for (var i = 0; i < players.length; i++) {
      positionColumnX = CLOUD_X + MARGIN_LEFT_DIAGRAM + (BAR_WIDTH + SPACE_BETWEEN_COLUMN) * i;
      heightBar = times[i] * MAX_BAR_HEIGHT / maxTime;
      barY = bottomCloud - heightBar - 40;
      if (players[i] === 'Вы') {
        ctx.fillStyle = RED_COLOR;
      } else {
        ctx.fillStyle = getRandomColor(HSL_HUE_OTHER_PLAYER);
      }
      ctx.fillRect(positionColumnX, barY, BAR_WIDTH, heightBar);
      ctx.fillStyle = BLACK_COLOR;
      ctx.fillText(players[i], positionColumnX, bottomCloud - 30);
      ctx.fillText(String(Math.floor(times[i])), positionColumnX, barY - FONT_GAP);
    }
  };
})();
