const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    var data = {
        "httpVersion": req.httpVersion,
        "headers": req.headers,
        "url": req.url,
        "method": req.method,
        "query": req.query
    };
    console.log(JSON.stringify(data));
    next();
});

app.post('/api/persona', function (req, res) {
    console.log(req.body);
    //todo nuestro codigo por aqui
    res.send(`Se creó la persona ${req.body.nombre} ${req.body.apellido} ${req.body.dni}`);
});

app.listen(8080);