let http = require("http");
let serverHandler = require("../app");

console.log(serverHandler, "serverHandler")

const PORT = 8001;
let server = http.createServer(serverHandler);

server.listen(PORT)
console.log("服务启动成功")