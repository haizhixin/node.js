const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
//处理postData

const handleBlogRouter = (req, res) => {
    const method = req.method;
    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || ""
        const keyword = req.query.keyword || ""
        const listData = getList(author, keyword)
        if (listData) {
            return new SuccessModel(listData, "成功")
        }
    }
    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id || "";
        const detailData = getDetail(id);
        if (detailData) {
            return new SuccessModel(detailData, "成功")
        }
    }
    // 新增博客
    if (method === "POST" && req.path === "/api/blog/new") {
        const postData = req.body;
        const listData = newBlog(postData);
        if (listData) {
            return new SuccessModel(listData, "成功插入")
        }
    }
    // 删除博客
    if (method === "POST" && req.path === "/api/blog/del") {
        return {
            msg: "删除博客成功"
        }
    }
    // 更新博客
    if (method === "POST" && req.path === "/api/blog/update") {
        const id = req.query.id || "";
        const postData = req.body;
        const result = updateBlog(id, postData);
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel()
        }
    }
}

module.exports = handleBlogRouter