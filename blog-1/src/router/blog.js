const { getList, getDetail, newBlog, updateBlog,deleteBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
//处理postData
const handleBlogRouter = (req, res) => {
    const method = req.method;
    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        return getList(author, keyword).then(data => {
            return new SuccessModel(data, "成功")
        })
    }
    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id || "";
        const author = req.query.author || ""
        return getDetail(id).then(data => {
            return new SuccessModel(data, "成功")
        })
    }
    // 新增博客
    if (method === "POST" && req.path === "/api/blog/new") {
        const postData = req.body;
        return newBlog(postData).then(data => {
            if (data) {
                return new SuccessModel(data, "插入成功")
            }
            return new ErrorModel("新增失败")
        })
    }
    // 更新博客
    if (method === "POST" && req.path === "/api/blog/update") {
        const id = req.query.id || "";
        const postData = req.body;
        return updateBlog(id, postData).then(data => {
            if (data) {
                return new SuccessModel("更新博客成功")
            } else {
                return new ErrorModel("更新博客失败")
            }
        });
    }

    // 删除博客
    if (method === "POST" && req.path === "/api/blog/del") {
        const id = req.query.id || "";
        const {author} = req.body;
        return deleteBlog(id, author).then(data => {
            if (data) {
                return new SuccessModel("删除成功")
            }
            return new ErrorModel("删除失败")
        })
    }
}
module.exports = handleBlogRouter