const http = require("http");
const fs= require("fs");
const server = http.createServer((req,res)=>{
    const url =req.url;
    const method = req.method;
    if(req.url=="/"){
        res.setHeader("Content-type","text/html");
        res.end(
            `
            <form action="/message" method="POST">
            <label>Name:</label>  
            <input tpe="text" name="username"/>  
            <button type="submit">Add</button>
            </form>
            `
        )
    }
    else if(req.url==="/message"){
        let body = [];
        req.on("data",(chunks)=>{
            body.push(chunks);
        });
        req.on("end",()=>{
            let buffer = Buffer.concat(body);
            let formData = buffer.toString();
            const formValues = formData.split("=")[1];
            fs.writeFile("formValues.txt",formValues,(err)=>{
                res.statusCode=302;
                res.setHeader("Location","/");
                res.end();
            })
        })
    }
})
server.listen(3001,()=>{
    console.log("server is running");
})