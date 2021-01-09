const express = require('express');
const router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.post('/login',function(req,res,next){
   const { username, password } = req.body;
   return login(username, password).then(data => {
            if (data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()} `);
                
                // 同步到redis
                // set(req.sessionId,req.session)

                return res.json(new SuccessModel("登录成功")) 
            }
            return res.json(new ErrorModel("登录失败"))
        })
})

module.exports = router