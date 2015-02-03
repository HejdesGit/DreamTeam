'use strict';

var $ = require('jquery');
require('howler');

/**
 * Timer - A module for timer.
 * @module timer
 * @PublicMethod Init
 */

module.exports = (function () {

  var config = {
    urls: 'sounds/Knight.mp3',
    urls2: 'sounds/GoNoGo.mp3',
    time: {hours: 9, minutes: 30},
    time2: {hours: 10, minutes: 59}
  };

  var sound = new Howl({
    urls: [config.urls]
  });
  var sound2 = new Howl({
    urls: [config.urls2]
  });

  function Init() {
    var now = new Date();
    var millisTillStandUp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.time.hours, config.time.minutes, 0, 0) - now;
    if (millisTillStandUp < 0) {
      millisTillStandUp += 86400000; // it's after stand up, try tomorrow.
    }
    var millisTillGoNoGO = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.time2.hours, config.time2.minutes, 0, 0) - now;
    if (millisTillGoNoGO < 0) {
      millisTillGoNoGO += 86400000; // it's after stand up, try tomorrow.
    }

    setTimeout(function () {
      console.log("play sound");
      sound.play();
      Init();
    }, millisTillStandUp);

    setTimeout(function () {
      console.log("play sound");
      sound2.play();
      Init();
    }, millisTillGoNoGO);
  }

  return {
    Init: Init,
    config: config
  };
}());
