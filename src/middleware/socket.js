const { socketkey } = require("../config");

const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;

function startFyersWebSocket(symbol) {
  // Create a new instance of FyersOrderSocket
  const fyersOrderdata = new FyersOrderSocket(socketkey);

  // Error event handler
  fyersOrderdata.on("error", function (errmsg) {
    console.log(errmsg);
  });

  // General event handler
  fyersOrderdata.on("general", function (msg) {
    console.log(msg);
  });

  // Connect event handler
  fyersOrderdata.on("connect", function () {
    fyersOrderdata.subscribe([
      { symbol: symbol, data_type: fyersOrderdata.tradeUpdates },
    ]);
  });

  // Close event handler
  fyersOrderdata.on("close", function () {
    console.log("closed");
  });

  // Trades event handler
  fyersOrderdata.on("trades", function (msg) {
    console.log("trades", msg);
  });

  // Autoreconnect
  fyersOrderdata.autoreconnect();

  // Connect to the Fyers API
  fyersOrderdata.connect();
}

module.exports = startFyersWebSocket;
