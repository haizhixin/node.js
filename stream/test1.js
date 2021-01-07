//标准的输入输出

// process.stdin.pipe(process.stdout)

// const http = require("http")

// const server = http.createServer((req,res)=>{
//     if(req.method === "POST") {
//         req.pipe(res) // 最主要
//     }
// })

// server.listen(8000)

// 复制文件

// const fs = require("fs")
// const path = require("path")

// const fileName1 = path.resolve(__dirname,"data1.txt");
// const fileName2 = path.resolve(__dirname,"data-bak.txt");

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// // 监听每次读取的文件内容 (因为读取是一点点完成的)
// readStream.on("data",(chunk)=>{
//     console.log(chunk.toString())
// })

// readStream.on("end",()=>{
//     console.log("复制完成")
// })

const http = require('http')
const fs = require("fs")
const path = require("path")
const fileName1 = path.resolve(__dirname,'data.txt');

const server = http.createServer((req,res)=>{
    if(req.method === "GET") {
        const readStream = fs.createReadStream(fileName1);
        readStream.pipe(res)
    }
})

server.listen(8008)