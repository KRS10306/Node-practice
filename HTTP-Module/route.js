const http = require('http');


const server = http.createServer((req,res)=>{
const url = req.url;

if (url === "/") {
    res.end("Home Page")
}
else if (url === "/about") {
    res.end("About Page")
} else {
    res.writeHead(404, {'content-type': 'text/plain'})
    res.end("Page not found")
}
})

server.listen(9000, ()=> console.log("Running on 9000"))