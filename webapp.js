var express = require('express');
const { request, response } = require('express');

//create app
var app = express();

//listen to port
app.listen(3000);
console.log("server runnig at http://192.168.0.21:3000/");

//static files
app.use(express.static('public'));
//formidable for image upload?

//pages
app.get('/', (request, response) => {
    console.log(request);
    response.sendFile('./public/index.html', {root: __dirname});
});

app.get('/about', (request, response) => {
    response.send('about');
});

//404
app.use((request, response) => {
    response.send("error 404");
});

//fetch()