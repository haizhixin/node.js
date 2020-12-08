const handleBlogRouter = (req,res)=> {
  const method = req.method;
  let url = req.url;
  let path = url.split("?")[0]

  console.log(path,"path")
  // 获取博客列表
  if(method === "GET" && path === "/api/blog/list") {
     return {
       msg: "获取博客列表"
     }
  }
  // 获取博客详情
  if(method === "GET" && path === "/api/blog/detail") {
    return {
      msg:"获取博客详请成功"
    }
  }
  // 新增博客
  if(method === "POST"&& path === "/api/blog/new") {
    return {
      msg:"新增博客成功"
    }
  }
  // 删除博客
  if(method === "POST"&& path === "/api/blog/del") {
    return {
      msg:"删除博客成功"
    }
  }
  // 更新博客
  if(method === "POST" && path === "/api/blog/update") {
    return {
      msg:"更新博客成功"
    }
  }
}

module.exports = handleBlogRouter