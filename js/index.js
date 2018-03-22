/*

Rosa - 4307
Maria - 4293
Joan - 4283
Mireia - 4281
Jordi - 4267
Eva - 4299
Alberto -- 4300

*/

var timeline = [
  {
    start: '0:24',
    end: '2:03',
    name: 'de la Mireia i en Joan',
    device: 4281,
    lang: 'ca'
  },
  {
    start: '2:35',
    end: '3:51',
    name: 'de la Rosa i la Gemma',
    device: 4307,
    lang: 'ca'
  },
  {
    start: '3:51',
    end: '5:03',
    name: 'd\'en Martí',
    device: 4262,
    lang: 'ca'
  },
  {
    start: '6:25',
    end: '7:31',
    name: 'd\'en Joan i la Remei',
    device: 4283,
    lang: 'ca'
  },
  {
    start: '7:50',
    end: '9:50',
    name: 'de l\'Eva i l\'Alberto',
    device: 4300,
    lang: 'ca'
  },
  {
    start: '10:16',
    end: '11:55',
    name: 'de Mireia y Joan',
    device: 4281,
    lang: 'es'
  },
  {
    start: '12:27',
    end: '13:43',
    name: 'de Rosa y Gemma',
    device: 4307,
    lang: 'es'
  },
  {
    start: '13:43',
    end: '14:55',
    name: 'de Martí',
    device: 4262,
    lang: 'es'
  },
  {
    start: '16:17',
    end: '17:23',
    name: 'de Joan y Remei',
    device: 4283,
    lang: 'es'
  },
  {
    start: '17:42',
    end: '19:42',
    name: 'de Eva y Alberto',
    device: 4300,
    lang: 'es'
  },
  {
    start: '20:07',
    end: '21:46',
    name: 'Mireia and Joan',
    device: 4281,
    lang: 'en'
  },
  {
    start: '22:18',
    end: '23:34',
    name: 'Rosa and Gemma',
    device: 4307,
    lang: 'en'
  },
  {
    start: '23:34',
    end: '24:46',
    name: 'Martí',
    device: 4262,
    lang: 'en'
  },
  {
    start: '26:08',
    end: '27:14',
    name: 'Joan and Remei',
    device: 4283,
    lang: 'en'
  },
  {
    start: '27:33',
    end: '29:33',
    name: 'Eva and Alberto',
    device: 4300,
  }
];

$(document).ready(function() {
  var popcorn = Popcorn("#thevideo");

  var textElement = $("#text");

  textElement.hide();

  timeline.forEach(function(sequence, index, array) {
    var popcornSequence = {
      start: toSec(sequence.start),
      end: (sequence.end) ? toSec(sequence.end) : array[index + 1] ? toSec(array[index + 1].start) : popcorn.duration(),
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

    var timeDiff = (new Date() - new Date(kit.data.recorded_at))/1000;
    var isActive = (timeDiff < 3600) ? true : false;

    switch (sequence.lang) {
      case 'ca':
        var nowText = (isActive) ? "Ara mateix " : "Fa unes hores ";
        var measuresText = (isActive) ? "medeix " : "media ";

        text =
            nowText
          + "el Kit "
          + sequence.name
          + " a la Plaça del Sol "
          + measuresText
          + Math.round(noise.value).toFixed(0)
          + " "
          + noise.unit;
        break;
      case 'es':
        var nowText = (isActive) ? "Ahora mismo " : "Hace unas horas ";
        var measuresText = (isActive) ? "mide " : "medía ";

        text =
          nowText
          + "el Kit "
          + sequence.name
          + " en la Plaça del Sol "
          + measuresText
          + Math.round(noise.value).toFixed(0)
          + " "
          + noise.unit;
        break;
      case 'en':
        var nowText = (isActive) ? "Now, " : "Some hours ago, ";
        var measuresText = (isActive) ? "measures " : "measured ";
        text =
          nowText
          + sequence.name
          + " Kit at Plaça del Sol "
          + measuresText
          + Math.round(noise.value).toFixed(0)
          + " "
          + noise.unit
        break;
    }

    var dif = 1000 - (Date.now() - fetchTime);
    setTimeout(function() {
      el.text(text);
      el.fadeIn(1000);
    }, dif);
  });
}

function toSec(minSec){
  var ts = minSec.split(':').reverse();
  return Number(ts[0]) + ((ts[1]) ? Number(ts[1]) * 60 : 0);
}



// Generator

/*var newTimline = [];

for (var i = timeline.length - 1; i >= 0; i--) {
  var sequence = timeline[i];
  var newSequence =   {
    start: addT(sequence.start),
    end: addT(sequence.end),
    name: sequence.name,
    device: sequence.device,
    lang: 'en'
  }
  newTimline.push(newSequence);
}

console.log(JSON.stringify(newTimline.reverse()));

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


function addT(minSec){
  var tn = toSec(minSec) + Math.round(591.342000*2);
  return fancyTimeFormat(tn);
}


function fancyTimeFormat(time){
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

*/