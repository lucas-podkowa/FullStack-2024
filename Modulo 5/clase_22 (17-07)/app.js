var express = require('express');
var app = express();


app.get('/', (req, res) => {
    respuesta.send("Esto es el HOME o pagina principal " + "<button> perfiles</button>");
});

app.get('/perfiles', (req, res) => {
    respuesta.send("esto es el perfil de lucas");
});

app.get('/perfil/lucas', (req, res) => {
    respuesta.send("esto es el perfil de lucas");
});

app.get('/user/:id', (req, res) => {
    res.send(req.query);
});


app.listen(3000, () => { 
    es
});