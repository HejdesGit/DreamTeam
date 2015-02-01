'use strict';

var $ = require('jquery'),
  Firebase = require("firebase"),
  Week = require("./week");

/**
 * Dictator - A module for showing a who's the dictator.
 * @module dictator
 * @PublicMethod Init
 */

module.exports = (function () {
  var button,
    dictatorNumber,
    dictatorName,
    firebaseURL,
    startWeek,
    dictators,
    currentDictator;

  var config = {
    firebaseURL: 'https://fiery-torch-4818.firebaseio.com/'
  };

  function Init() {
    firebaseURL = new Firebase(config.firebaseURL);
    button = $('.js-dictator__button');
    getDictatorsFromFirebase();
    getStartWeek();
    firebaseURL.once('value', function (snap) {
      //console.log('initial data loaded!', Object.keys(snap.val()).length === count);
      getCurrentDictator();
    });

    readSingleFromFirebase();
    button.click(function (event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      addDictotor();
      writeToFireBase();
    });
  }

  function addDictotor() {
    dictatorNumber = parseInt($('.dictator__number input').val(), 10);
    dictatorName = $('.dictator__name input').val();
  }

  function writeToFireBase() {
    var dictator = {};
    dictator[dictatorNumber] = dictatorName;
    firebaseURL.child("dictator/").update(dictator);
  }

  function getDictatorsFromFirebase() {
    firebaseURL.child("dictator").on('value', function (snapshot) {
      dictators = snapshot.val();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  function getStartWeek() {
    firebaseURL.child("StartWeek").on('value', function (snapshot) {
      startWeek = snapshot.val();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  function getCurrentDictator() {
    var curWeek = Week.getWeek();
    var weekFromStart = curWeek - startWeek;
    var maxDictator = 10;
    var currentNumber = weekFromStart % maxDictator;
    currentDictator = dictators[currentNumber];
    $('.currentDictator').text(currentDictator);
  }

  function readSingleFromFirebase() {
    firebaseURL.child("dictator").on('child_added', function (snapshot) {
      var snapshotValue = snapshot.val(),
        snapshotName = snapshot.name();
      $('.dictator_output__list').append('<li><label>' + '#: ' + snapshotName + ' Namn: ' + snapshotValue + '</label></li>');
    });
  }

  return {
    Init: Init,
    config: config
  };
}());
