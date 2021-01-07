const fs = require("fs");
const path = require("path")
const fileName = path.resolve(__dirname,"data.text")
// fs.readFile(fileName,(err,data)=>{
//     if(err) {
//         console.error(err)
//         return
//     }

//     console.log(data.toString())
// })

//写入文件
// const content = `这是我写入的第一个内容\n`

// const opt = {
//     flag:"a" // 这是追加内容 覆盖用"w"
// }

// fs.writeFile(fileName,content,opt,(err)=>{
//     if(err) {
//         console.error(err)
//         return
//     }
// })

// 判断文件是否存在

fs.exists(fileName, (exist)=>{
    console.log(exist,"exist")
})
// 以上方法都是异步的


