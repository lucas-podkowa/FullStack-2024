
var http = require('http'); //importamos el modulo nativo http
var uc = require('upper-case'); //importamos el modulo de terceros instalado con npm

// creamos la configuracion del servidor
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(uc.upperCase("Hello World!"));
    res.end();
});

//lo iniciamos en el puerto 3000
server.listen(3000);