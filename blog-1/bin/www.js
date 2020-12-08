let http = require("http");
let {serverHandler} = require("../app");

console.log(serverHandler,"serverHandler")

const PORT = 8000;
let server = http.createServer(serverHandler);

server.listen(PORT)

