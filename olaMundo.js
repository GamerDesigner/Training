var http = require('http');
var server = http.createServer(); 
var fs = require('fs');
var path = require('path');

server.on('request', function(request,response) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './home.html';
    else if(filePath == './contato')
        filePath = './contato.html'
    else if(filePath == './nosso-pessoal')
        filePath = './nosso-pessoal.html'
    else if(filePath == './sobre-nos')
        filePath = './sobre-nos.html'
        
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'applilcation/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octect-stream';


    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
})


server.listen(3000);
console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');