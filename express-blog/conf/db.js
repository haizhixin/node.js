const env = process.env.NODE_ENV; //环境参数
let MYSQL_CONF; //配置 mysql数据库
let REDIS_CONF; //配置 redis数据库
if (env == "dev") {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: "12345aa",
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        host: "127.0.0.1",
        port: "6379"
    }

} else if (env == "production") {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: "12345aa",
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        host: "127.0.0.1",
        port: "6379"
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}