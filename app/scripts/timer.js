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
    time: {hours: 9, minutes: 30}
  };

  var sound = new Howl({
    urls: [config.urls]
  });

  function Init() {
    var now = new Date();
    var millisTillStandUp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.time.hours, config.time.minutes, 0, 0) - now;
    if (millisTillStandUp < 0) {
      millisTillStandUp += 86400000; // it's after stand up, try tomorrow.
    }

    setTimeout(function () {
      console.log("play sound");
      sound.play();
      Init();
    }, millisTillStandUp);
  }

  return {
    Init: Init,
    config: config
  };
}());
