const handleUserRouter = (req,res)=> {
  const method = req.method;
  let url = req.url;
  let path = url.split("?")[0]
  if(method === "POST" && path === "/api/user/login") {
    return {
      msg : "登录成功"
    }
  }
}
module.exports = handleUserRouter