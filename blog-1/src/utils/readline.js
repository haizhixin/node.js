const fs = require("fs")
const path = require("path")
const readline = require("readline")

//文件名
const fileName = path.join(__dirname,"../","../","logs","access.log")

// 创建read stream
const readStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
    input:readStream//readline是基于流读取的
})


let chromNum = 0; //chrome浏览器访问的数量
let sum = 0;//总行数

//逐行读取
rl.on('line',(lineData)=>{
    // 排除异常情况
    if(!lineData) {
        return
    }
    sum ++

    const arr = lineData.split("--");
     if(arr[2].indexOf("Chrome")>0) {
         //累加Chrome的数量
         chromNum ++
     }

     
})
//读取完成
rl.on("close",()=>{
    console.log("Chrome浏览器的占比:"+chromNum/sum)
})


