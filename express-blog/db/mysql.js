const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接
const con = mysql.createConnection(MYSQL_CONF);
// 建立连接
con.connect()
// 执行sql语句
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

// 此处不关闭连接否则执行完一个sql之后就会断开连接导致该方法只能执行一次
module.exports = {
    exec,
    escape: mysql.escape //防止sql注入
}