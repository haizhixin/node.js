const handleBlogRouter = (req,res)=> {
  const method = req.method;
  let url = req.url;
  let path = url.split("?")[0]
  // 获取博客列表
  if(method === "GET" && path === "api/blog/list") {
     return {
       msg: "获取博客详情成功"
     }
  }
  // 新增博客
  if(method === "POST"&& path === "api/blog/add")

  // 删除博客

  // 查询博客

  // 博客详情
  
}