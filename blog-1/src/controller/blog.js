//执行sql查询语句从数据库中获取数据
const { exec } = require("../db/mysql")
//博客列表
const getList = (author, keyword) => {
    //此处1=1是为了拼接后面的查询条件 相当于url中的?
    let sql = "select * from blogs where 1=1"
    if (author) {
        sql += ` and author="${author}"`
    }
    if (keyword) {
        sql += ` and title like "%${keyword}%"`
    }
    sql += ` order by createtime desc;`
    return exec(sql)
}
//博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id =${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// 新建博客就是往数据库中插入数据
const newBlog = (postData) => {
    const { author, title, content } = postData;
    const createtime = Date.now();
    let sql = `insert into blogs (author,title,content,createtime) values( '${author}','${title}','${content}',${createtime})`;
    //此时数据要插入到数据库中会返回一个id 为3
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}
//更新博客
const updateBlog = (id, postData = {}) => {
    const { author, title, content } = postData;
    const createtime = Date.now()
    let sql = `update blogs set title='${title}',content='${content}',createtime=${createtime} where  id=${id}`;
    return exec(sql).then(updateData => {
        console.log(updateData,"updateData")
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
    //此时数据也要插入到数据库中  更新成功返回true
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`;
    console.log(sql)
    // 删除成功
    return exec(sql).then(data => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}