const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require('./src/router/user');
const {access} = require("./src/utils/log")
const querystring = require("querystring");
const {get,set} = require('./src/db/redis')

const getCookieExpires = () => {
    let d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}




// 储存session
// const SESSION_DATA = {};
//处理postData 因为postData是异步的
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method != "POST") { //不是post请求返回一个空对象
            resolve({})
            return
        }
        if (req.headers["content-type"] !== "application/json") { //如果不是json类型
            resolve({})
            return
        }
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
}

const serverHandler = (req, res) => {
    //记录访问日志

    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type', 'application/json')
    // res.writeHead(200, { "Content-Type": "application/json" });
    let url = req.url;
    req.path = url.split("?")[0];
    req.query = querystring.parse(url.split("?")[1])

    //获取cookie的值 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(";").forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split("=");
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val
    })

    // 解析session 把session写入内存中
    // let needSetCookie = false; //设置cookie标识
    // let userId = req.cookie.userid;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    

    // 解析 session (使用redis)
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if(!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        //初始化redis中的session值
        set(userId,{})
    }
    req.sessionId = userId;
    get(req.sessionId).then(sessionData=>{
        if(sessionData == null) {
            //初始化redis中的session值
            set(req.sessionId,{})
            // 设置session
            req.session = {}
        } else {
            // 设置session 
            req.session = sessionData;
        }
        // console.log('req.session',req.session)
        // 处理post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData;
        //处理博客返回信息 
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()} `);
                }
                res.end(JSON.stringify(blogData))
            });
            return
        }

        // 处理登录返回信息
        const useResult = handleUserRouter(req, res)
        if (useResult) {
            useResult.then(useData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()} `);
                }
                res.end(JSON.stringify(useData))
            })
            return
        }

        //如果没有命中请求返回404
        res.writeHead(404, {
            "Content-Type": "text/plain"
        })
        res.write("not found 404")
        res.end()
    })
}

module.exports = serverHandler