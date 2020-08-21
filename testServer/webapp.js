const http = require('http');
const fs = require('fs')

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    response.setHeader('content-type', 'text/html');
    fs.readFile('../index.html', (err, data) => {
        if (err) {
            console.log(err);
            response.end();
        } else {
            //response.write(data);
            response.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log("listening on port 3000");
})