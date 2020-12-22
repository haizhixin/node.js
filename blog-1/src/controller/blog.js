//执行sql查询语句从数据库中获取数据
const { exec } = require("../db/mysql")
//博客列表
const getList = (author, keyword) => {
    //此处1=1是为了拼接后面的查询条件 相当于url中的?
    const sql = "select * from blogs where 1=1";
    if (author) {
        sql += `and autor = ${author}`
    }
    if (keyword) {
        sql += `and title like%${keyword}%`
    }
    sql += `order by createtime desc;`

    return exec(sql)





    // if (author == "张三" && keyword == "123") {
    //     return [
    //     {
    //         title: "标题1",
    //         content: "内容一",
    //         id: 1,
    //         createTime: 1607520655836,
    //         author: "张三"
    //     },
    //     {
    //         title: "标题2",
    //         content: "内容二",
    //         id: 1,
    //         createTime: 1607520655836,
    //         author: "张三"
    //     },
    //     {
    //         title: "标题3",
    //         content: "内容三",
    //         id: 1,
    //         createTime: 1607520655836,
    //         author: "张三"
    //     }]
    // }
}
//博客详情
const getDetail = (id) => {
    return {
        title: "标题1",
        content: "内容一",
        id: 1,
        createTime: 1607520655836,
        author: "张三"
    }
}

const newBlog = (postData) => {

    //此时数据要插入到数据库中会返回一个id 为3
    return {
        id: 3
    }

}
//更新博客
const updateBlog = (id, postData) => {
    //此时数据也要插入到数据库中  更新成功返回true
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog
}