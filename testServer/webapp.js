const http = require('http');
const fs = require('fs')

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader('content-type', 'text/html');
    fs.readFile('../pages/canvas.html', (err, data) => {
        if (err) {
            console.log(err);
            response.end();
        } else {
            //response.write(data);
            response.end(data);
        }
    });
});

server.listen(3000, '192.168.0.21', () => {
    console.log("listening on port 3000");
})