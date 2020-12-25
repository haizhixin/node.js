const { exec } = require("../db/mysql")
const login = (author, password) => {
    let sql = `select username, realname from users where author= '${author}' and password = ${password}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
module.exports = {
    login
}