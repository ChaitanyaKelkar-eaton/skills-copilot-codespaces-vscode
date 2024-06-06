// Create web server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');

var comments = [
    { name: "Sasha", comment: "Hello" },
    { name: "Petya", comment: "Hi" }
];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    if (request.method == 'GET' && request.url == '/') {
        fs.readFile('./index.html', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    } else if (request.method == 'GET' && request.url == '/comments') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(comments));
        response.end();
    } else if (request.method == 'POST' && request.url == '/comments') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var comment = JSON.parse(body);
            comments.push(comment);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(comment));
            response.end();
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<h1>Not found</h1>');
        response.end();
    }
});

// Listen on port 8000, IP defaults to