const express = require('express')
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog,deleteBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")
//处理postData

// // 统一登录验证
// const loginCheck = (req)=>{
//     console.log(req,"req")
//     if(!req.session.username) {
//         return Promise.resolve(new ErrorModel("尚未登录"))
//     }

// }
// 获取博客列表
        router.get('/list',(req,res,next)=>{
            let author = req.query.author || ""
                const keyword = req.query.keyword || ""

                // if(req.query.isadmin) {
                //     console.log("管理员页面")
                //     // 管理员界面
                //     const loginCheckResult = loginCheck(req)
                //     if(loginCheckResult) {
                //     // 未登录
                //      return loginCheckResult
                //     }
                //     // 强制查询自己的博客
                //     author = req.session.username
                // }

                return getList(author, keyword).then(data => {
                    
                    return res.json(new SuccessModel(data, "成功")) 
                })
        })

        // 获取博客详情
        router.get('/detail',(req,res,next)=>{
            const id = req.query.id || "";
            // const author = req.query.author || ""
            return getDetail(id).then(data => {
                return res.json(new SuccessModel(data, "成功"))
            })
        })

        // 新增博客
        router.post('/new',(req,res,next)=>{
            res.body.author = req.session.username
            const postData = req.body;
            return newBlog(postData).then(data => {
                if (data) {
                  return  res.json(new SuccessModel(data, "插入成功")) 
                }
                return res.json(new ErrorModel("新增失败"))
            })
        })
       // 更新博客
        router.post('/update',(req,res,next)=>{
            const id = req.query.id || "";
            const postData = req.body;
            return updateBlog(id, postData).then(data => {
                if (data) {
                  return  res.json(new SuccessModel("更新博客成功")) 
                } else {
                    return res.json(new ErrorModel("更新博客失败"))
                }
            });
        })



    // 删除博客
    router.post('/del',(req,res,next)=>{
        const id = req.query.id || "";
        const {author} = req.body;
        return deleteBlog(id, author).then(data => {
            if (data) {
                return res.json(new SuccessModel("删除成功"))
            }
            return res.json(new ErrorModel("删除失败"))
        })
    })
    
    module.exports = router