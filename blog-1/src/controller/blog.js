const getList =(author,keyword)=> {

    if(author =="张三"&&keyword == "123") {
         return [
    {
      title:"标题1",
      content:"内容一",
      id:1,
      createTime:1607520655836,
      author:"张三"
   },
   {
    title:"标题2",
    content:"内容二",
    id:1,
    createTime:1607520655836,
    author:"张三"
    },
    {
      title:"标题3",
      content:"内容三",
      id:1,
      createTime:1607520655836,
      author:"张三"
   }
  ]

    } 
  
 
}

module.exports = {
  getList
}