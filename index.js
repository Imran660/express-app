//import statement
const express=require("express");
require("dotenv").config()


//config 


// picking the available port from the current environment if it's there then it will use that otherwise it will go for 5000
const port=process.env.PORT || 5000;



//server init or creating express object
const server=express()



//server middlewares


//server routes or api or service
server.get("/",(req,res)=>{
    res.send("Hello users, welcome to our backend services..")
})



//server listen or start
server.listen(port,()=>console.log(`server is running on the port ${port}`))