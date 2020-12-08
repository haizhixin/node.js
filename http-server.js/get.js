const http = require("http");
const url = require("url")
const querystring = require("querystring")
// GET请求
http.createServer((req,res)=>{
 console.log(req.method)
 res.writeHead(200,{'Content-Type':"text/plain"})
 const url = req.url;// 获取完整的url
 
 req.query = querystring.parse(url.split("?")[1])
//  let pathname = url.parse(req.url).pathname;
console.log(req.query)
 res.end(JSON.stringify(req.query))

}).listen("8000")
console.log("服务器已启动")



