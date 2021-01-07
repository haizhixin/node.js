const { login } = require("../controller/user");
const { set } = require('../db/redis');
const { SuccessModel, ErrorModel } = require("../model/resModel")


const getCookieExpires = () => {
    let d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
const handleUserRouter = (req, res) => {
    const method = req.method;
    if (method === "POST" && req.path === "/api/user/login") {

        const { username, password } = req.body;
        return login(username, password).then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()} `);
                
                // 同步到redis
                set(req.sessionId,req.session)

                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }
    // 检查是否登录
    // if (method === "GET" && req.path === "/api/user/login-test") {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel("已经登录"))
    //     }
    //     return Promise.resolve(new ErrorModel("尚未登录"))
    // }
}
module.exports = handleUserRouter