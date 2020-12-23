const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require('./src/router/user');
const querystring = require("querystring")
//处理postData 因为postData是异步的
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method != "POST") { //不是post请求返回一个空对象
            resolve({})
            return
        }
        if (req.getHeaders("Content-Type") != "application/json") { //如果不是json类型
            resolve({})
            return
        }
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        })
        if (!postData) { //如果没有数据
            resolve({})
            return
        }
        req.on("end", () => {
            resolve(JSON.parse(postData))
            return
        })
    })
}

const serverHandler = (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    let url = req.url;
    req.path = url.split("?")[0];
    req.query = querystring.parse(url.split("?")[1])
    getPostData(req).then(postData => {
        req.body = postData;
        //处理博客返回信息 
        const blogResult= handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData=>{
                res.end(JSON.stringify(blogData))
            });

            return 
        }
        // 处理登录返回信息
        const useData = handleUserRouter(req, res)
        if (useData) {
            res.end(
                JSON.stringify(useData)
            )
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