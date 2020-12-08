let http = require("http")
let url =  require("url")
let querystring = require("querystring")
let server = http.createServer((req,res)=> {
   res.setHeader("Content-Type","application/json");
    const url = req.url;
    const path = url.split("?")[0];
    const query =querystring.parse(url.split("?")[1]);
    const method = req.method;
    const resData = {
        url,
        path,
        query,
        method,
    }
  if(req.method == "GET") {
    res.end(JSON.stringify(resData))
  }

  if(req.method == "POST") {
     
      let postData = "";
      req.on("data",chunk => {
        postData += chunk;
      })
      req.on("end",()=>{
        resData.postData = postData;
        res.end(JSON.stringify(resData))
      })
  }


})
server.listen("8006")