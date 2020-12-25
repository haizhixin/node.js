const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleUserRouter = (req, res) => {
    const method = req.method;
    if (method === "POST" && req.path === "/api/user/login") {
        const author = req.query.author || "";
        const password = req.query.password || "";
        return login(author, password).then(data => {
            if (data.username) {
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }

    if (method === "POST" && req.path === "/api/user/login-test") {
        if (req.cookie.username) {
            return new SuccessModel("已经登录")
        }
        return new ErrorModel("尚未登录")
    }
}
module.exports = handleUserRouter