const http = require('http');
let port = 3000;

let server = http.createServer((req, res) => {
    //write a message
    res.end('Hello, my name is Prince Chukwu'); 
});
server.listen(port);
console.log(`server running at port ${port}`)


// var http = require('http');
// http.createServer(function (req, res) {
// //   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World! My name is Prince Chukwu from Nigeria.\n');
// }).listen(3000);
// console.log('Server running on port 8080.');





