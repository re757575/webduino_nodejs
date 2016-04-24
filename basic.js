'use strict';

var webduino = require('webduino-js'),
  board,
  led;

board = new webduino.WebArduino('yJL0');

// board = new webduino.Arduino({
//   'transport': 'serial',
//   'path': '/dev/cu.usbmodem1421'
// });

// board = new webduino.Arduino({
//   'transport': 'bluetooth',
//   'address': '30:14:09:30:15:67'
// });

board.on(webduino.BoardEvent.READY, function () {
  led = new webduino.module.Led(board, board.getDigitalPin(10));
  led.blink(50);

  setTimeout(function () {
    board.close();
  }, 5000);
});

board.on(webduino.BoardEvent.ERROR, function (err) {
  console.log(err);
});

board.on(webduino.BoardEvent.BEFOREDISCONNECT, function () {
  console.log('before disconnect');
});

board.on(webduino.BoardEvent.DISCONNECT, function () {
  console.log('disconnect');
  // test: should not emit 'disconnect' again
  board.disconnect();
});
