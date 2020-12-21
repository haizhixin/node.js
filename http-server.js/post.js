let http = require("http");
let url = require("url");
let querystring = require("querystring");

let server = http.createServer((req, res) => {
    console.log(req.method, req.headers["content-type"])
    if (req.method == "POST") {
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        })
        req.on("end", () => {
            res.end("Hell World")
        })

    }

})
console.log("服务已启动")
server.listen(8005)