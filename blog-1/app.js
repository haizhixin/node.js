const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require('./src/router/user');
const querystring = require("querystring")
const serverHandler = (req,res) => {
  res.writeHead(200,{"Content-Type":"application/json"});
  let url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]) 
  
 //处理博客返回信息 
 const postData = handleBlogRouter(req,res);
  if(postData) {
    res.end(
      JSON.stringify(postData)
    )
    return 
  }
  // 处理登录返回信息
  const useData = handleUserRouter(req,res)
  if(useData) {
    res.end(
      JSON.stringify(useData)
    )
    return
  }

  //如果没有命中请求返回404
  res.writeHead(404,{
    "Content-Type":"text/plain"
  })
  res.write("not found 404")
  res.end()
}

module.exports = serverHandler