const env = process.env.NODE_ENV; //环境参数
let MYSQL_CONF; //配置
if (env == "dev") {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: "12345aa",
        port: '3306',
        database: 'myblog'
    }

} else if (env == "production") {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: "12345aa",
        port: '3306',
        database: 'myblog'
    }
}
module.exports = {
    MYSQL_CONF
}