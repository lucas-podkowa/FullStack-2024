const express = require('express');
const app = express();

app.param('name', function (req, res, next, name) {
    const modified = name.toUpperCase();
    req.name = modified;
    next();
});

app.get('/api/users/:name', function (req, res) {
    res.send('Hello ' + req.name + '!');
});


app.get('/api/persona', function (req, res) {
    res.send('listado de personas');
});


app.put('/api/persona/:este_falco', function (req, res) {
    res.send('datos del flaco modificad');
});

app.post('/api/reserva', function (req, res) {
    datos_de_la_reserva = req.body;
    res.send("datos de la reserva creada");
});


app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});

//express --> interpretar peticiones bajo el protocolo HTTP

