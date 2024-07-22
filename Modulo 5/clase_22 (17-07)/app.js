var express = require('express');
var app = express();


app.get('/', function (peticion, respuesta) {
    respuesta.send("Esto es el HOME o pagina principal" + "<button> perfiles</button>");
});

app.get('/perfiles', function (peticion, respuesta) {
    respuesta.send("esto es el perfil de lucas");
});

app.get('/perfil/lucas', function (peticion, respuesta) {
    respuesta.send("esto es el perfil de lucas");
});

app.get('/user/:id', function (req, res) {
    res.send(req.query);
});


app.listen(3000);