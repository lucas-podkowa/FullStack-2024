const express = require('express');
const app = express();

app.get('/user/:variable', function (req, res) {
    res.send("el parametro que llego se llama " + req.params.variable);
});

app.get('/user/:id_persona/photos', function (req, res) {
    res.send(req.params);
});

app.get('/user/perfil', function (req, res) {
    res.send("esto es el pefil de una persona");
});



app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});
