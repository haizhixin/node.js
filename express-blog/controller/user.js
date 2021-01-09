const { exec, escape } = require("../db/mysql")
const login = (username, password) => {

    // 防止sql注入
    username = escape(username);
    password = escape(password)

    let sql = `select username, realname from users where username=${username} and password=${password};`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
module.exports = {
    login
}