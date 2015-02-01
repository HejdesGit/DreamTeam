//http://codepen.io/FelipeMartinin/pen/sAtvD

'use strict';
var $ = require('jquery');

module.exports = (function () {
  function Init() {
    bind();
  }

  function bind() {
    $('.goFlip').on("click", function () {
      $('.aboutMe').toggleClass('rotate-3d');
      $('.card-back').toggleClass('z-up');
    });
  }

  return {
    Init: Init
  };
}());
