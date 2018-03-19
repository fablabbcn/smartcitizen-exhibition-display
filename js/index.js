//https://www.dropbox.com/sh/g9911bf7axh60c9/AAA0IXtZVyJuvPZwVLkw9uGRa/%26DESIGN%20WORK/Fonts?dl=0


var timeline = [
  {
    start: 0,
    device: 3958
  },
  {
    start: 5,
    device: 3976
  },
  {
    start: 10,
    device: 3958
  },
  {
    start: 15,
    device: 3976
  },
  {
    start: 20,
    device: 3958
  }
];

$(document).ready(function() {
  var popcorn = Popcorn("#thevideo");

  var textElement = $("#text");

  textElement.hide();

  timeline.forEach(function(sequence, index, array) {
    var popcornSequence = {
      start: sequence.start,
      end: array[index + 1] ? array[index + 1].start : popcorn.duration(),
      onStart: function() {
        fetchAndUpdate(index, sequence.device, textElement);
      },
      onEnd: function() {
        textElement.fadeOut(1000); // replace with css anim.
      }
    };
    popcorn.code(popcornSequence);
  });
});

function fetchAndUpdate(index, id, el) {
  var fetchTime = Date.now();

  $.getJSON("https://api.smartcitizen.me/v0/devices/" + id, function(
    smartcitizen
  ) {
    var noise = smartcitizen.data.sensors.filter(function(sensor) {
      return sensor.id === 23;
    })[0];
    var text =
      index +
      "# " +
      "Right now the sensor " +
      smartcitizen.name +
      " measures " +
      Math.round(noise.value).toFixed(1) +
      " " +
      noise.unit;
    var dif = 1000 - (Date.now() - fetchTime);
    setTimeout(function() {
      el.text(text);
      el.fadeIn(1000);
    }, dif);
  });
}