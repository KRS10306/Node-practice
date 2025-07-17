const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200, {"content-type": "text/plain"});
    res.end("Workingg")
})

server.listen(9000, ()=>{
    console.log("Server running on 9000")
})