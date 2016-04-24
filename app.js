var webduino = require('webduino-js');

var board, led;

board = new webduino.WebArduino('yJL0');

board.on(webduino.BoardEvent.READY, function() {

  // led on
  led = new webduino.module.Led(board, board.getDigitalPin(7));
  led.on();

  // RFID
  rfid = new webduino.module.RFID(board);

  // Buzzer
  buzzer = new webduino.module.Buzzer(board, board.getDigitalPin(8));

  // 啟動
  rfid.read();

  // 監聽感應
  rfid.on("enter", function(_uid) {
    rfid._uid = _uid;
    buzzer.play(["C7"], [10]);
    console.log('enter: '+ rfid._uid);
  });

  // 監聽離開
  rfid.on("leave", function(_uid) {
    rfid._uid = _uid;
    console.log('leave: '+ rfid._uid);
  });

});

board.on(webduino.BoardEvent.ERROR, function (err) {
  console.log(err);
});
