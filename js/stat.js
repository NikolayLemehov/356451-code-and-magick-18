'use strict';

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
var HSL_HUE_OTHER_PLAYER = 240;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// var renderLine = function (ctx, x, y, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, CLOUD_WIDTH, 1);
// };

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function (hslHue) {
  return 'hsl(' + hslHue + ', ' + (Math.random() * 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  // players = ['Вы', 'Кекс', 'Катя', 'Игорь'];// временно
  // times = [2725, 4025, 1244, 1339];// временно
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // renderLine(ctx, CLOUD_X, CLOUD_Y + FONT_GAP, 'red');// временно
  // renderLine(ctx, CLOUD_X, CLOUD_Y + FONT_GAP * 2, 'red');// временно
  // renderLine(ctx, CLOUD_X, CLOUD_Y + FONT_GAP * 3, 'red');// временно
  // renderLine(ctx, CLOUD_X, CLOUD_Y + CLOUD_HEIGHT - 40, '#020E86');// временно

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  // ctx.fillText('Ура вы победили!\nСписок результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);
  var positionColumnX = 0;
  var heightBar = 0;
  var barY = 0;
  var bottomCloud = CLOUD_Y + CLOUD_HEIGHT;

  for (var i = 0; i < players.length; i++) {
    positionColumnX = CLOUD_X + MARGIN_LEFT_DIAGRAM + (BAR_WIDTH + SPACE_BETWEEN_COLUMN) * i;
    heightBar = times[i] * MAX_BAR_HEIGHT / maxTime;
    barY = bottomCloud - heightBar - 40;
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomColor(HSL_HUE_OTHER_PLAYER);
    }
    ctx.fillRect(positionColumnX, barY, BAR_WIDTH, heightBar);
    // console.log(getRandomColor());
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(players[i], positionColumnX, bottomCloud - 30);
    ctx.fillText(String(Math.floor(times[i])), positionColumnX, barY - FONT_GAP);
  }
};
