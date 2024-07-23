const express = require('express');
const app = express();
app.get('/api/:year', function (req, res) {
    res.send(JSON.stringify(req.query) + JSON.stringify(req.params))
});
app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});
