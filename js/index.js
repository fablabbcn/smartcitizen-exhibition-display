//https://www.dropbox.com/sh/g9911bf7axh60c9/AAA0IXtZVyJuvPZwVLkw9uGRa/%26DESIGN%20WORK/Fonts?dl=0


/*

Vidal LLançana - 4307
Maria - 4293
Joan - 4283
Mireia - 4281
Jordi - 4267
Eva - 4299
Alberto -- 4300

*/

var timeline = [
  {
    start: 0,
    end: 5,
    name: 'la Maria',
    device: 4293,
    lang: 'cat'
  },
  {
    start: 5,
    end: 10,
    name: 'l\'Eva',
    device: 4299,
    lang: 'cat'
  }
  // {
  //   start: 10,
  //   end: 0,
  //   name: 'Maria',
  //   device: 3958
  // },
  // {
  //   start: 15,
  //   end: 0,
  //   name: 'Maria',
  //   device: 3976
  // },
  // {
  //   start: 20,
  //   end: 0,
  //   name: 'Maria',
  //   device: 3958
  // }
];

$(document).ready(function() {
  var popcorn = Popcorn("#thevideo");

  var textElement = $("#text");

  textElement.hide();

  timeline.forEach(function(sequence, index, array) {
    var popcornSequence = {
      start: sequence.start,
      end: sequence.end, //array[index + 1] ? array[index + 1].start : popcorn.duration(),
      onStart: function() {
        fetchAndUpdate(index, sequence, textElement);
      },
      onEnd: function() {
        textElement.fadeOut(1000); // replace with css anim.
      }
    };
    popcorn.code(popcornSequence);
  });
});

function fetchAndUpdate(index, sequence, el) {
  var fetchTime = Date.now();

  $.getJSON("https://api.smartcitizen.me/v0/devices/" + sequence.device, function(
    kit
  ) {

    var noise = kit.data.sensors.filter(function(sensor) {
      return sensor.id === 29;
    })[0];

    var text = '';

    switch (sequence.lang) {
      case 'cat':
        text =
          "Ara mateix el Kit de "
          + sequence.name
          + " a la Plaça del Sol medeix "
          + Math.round(noise.value).toFixed(1)
          + " "
          + noise.unit;
        break;
      case 'esp':
        break;
      case 'eng':
        break;
    }

    var dif = 1000 - (Date.now() - fetchTime);
    setTimeout(function() {
      el.text(text);
      el.fadeIn(1000);
    }, dif);
  });
}

function tellMe(value) {

  var scales = [
  {
    "speak": "This sounds like the weakest sound heard",
    "value": 0
  },
  {
    "speak": "This sounds like a whisper in a quiet library at",
    "value": 30
  },
  {
    "speak": "This sounds like a normal conversation",
    "value": 65
  },
  {
    "speak": "This sounds like a telephone dial tone",
    "value": 80
  },
  {
    "speak": "This sounds like a city traffic inside a car",
    "value": 85
  },
  {
    "speak": "This sounds like a  truck traffic",
    "value": 90
  },
  {
    "speak": "This sounds like a jackhammer",
    "value": 95
  },
  {
    "speak": "This sounds like a subway train",
    "value": 95
  },
  {
    "speak": "This sounds like a hand drill",
    "value": 98
  },
  {
    "speak": "This sounds like a power mower",
    "value": 107
  },
  {
    "speak": "This sounds like a snowmobile motorcycle",
    "value": 100
  },
  {
    "speak": "This sounds like a loud rock concert",
    "value": 115
  },
  {
    "speak": "This sounds like a pneumatic riveter",
    "value": 125
  },
  {
    "speak": "This sounds like a jet engine",
    "value": 140
  },
  {
    "speak": "This sounds like a shotgun blast",
    "value": 165
  },
  {
    "speak": "This sounds like the loudest sound possible",
    "value": 194
  }
];

  var scale = scales.find(function(scale) {
    return value < scale.value;
  });

  return scale.speak;
}