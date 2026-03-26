const http = require("http");
const server = http.createServer((req,res)=>{
    const url =req.url;
    const method = req.method;
    if(req.url=="/"){
        res.setHeader("Content-type","text/html");
        res.end(
            `
            <form>
            <label>Name:</label>  
            <input tpe="text" name="username"/>  
            </form>
            `
        )
    }
})