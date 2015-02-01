'use strict';


/**
 * Week - A module for showing week number.
 * @module week
 * @PublicMethod Init
 */

module.exports = (function () {
  function getWeek() {
    Date.prototype.getWeek = function () {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    var weekNumber = (new Date()).getWeek();

    return weekNumber;
  }

  return {
    getWeek: getWeek
  };
}());
