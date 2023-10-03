$(document).ready(function () {
  let maxProgress = 10;
  let currentValue = 7.5;
  let fillPercentage = currentValue / maxProgress;

  let options = {
    startAngle: -1.55,
    size: 150,
    value: fillPercentage,
    fill: { gradient: ["#a444b2", "#fa4299"] },
  };

  $(".circle .bar")
    .circleProgress(options)
    .on("circle-animation-progress", function (event, progress, stepValue) {
      $(this)
        .parent()
        .find("span")
        .text(String((stepValue * maxProgress).toFixed(2)));
    });
});
