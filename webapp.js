const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    switch (request.url) {
        case '/' :
            response.writeHead(200, {'content-type': 'text/html'});
            response.write('./pages/canvas.html');
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log("listening on port http//localhost:3000");
});