const express = require('express');
const app = express();

app.get('/api/prueba', function (req, res) {
   res.send("Realizo un get");
});
app.post('/api/prueba', function (req, res) {
   res.send("Realizo un post");
});
app.put('/api/prueba', function (req, res) {
   res.send("Realizo un put");
});
app.delete('/api/prueba', function (req, res) {
   res.send("Realizo un delete");

});


//crear medico
app.post('/api/medico/create', function (req, res) {
   query = 'INSERT INTO MEDICO (matricula, nombre, apellido, especialidad, observacion) VALUES (?, ?, ?, ?, ?)';
   medico = [
      req.body.matricula,
      req.body.nombre,
      req.body.apellido,
      req.body.especialidad,
      req.body.observacion
   ];
   
   conne
});

//modificar un medico
app.put('/api/prueba', function (req, res) {
   res.send("Realizo un put");
});

//eliminar un medico
app.delete('/api/prueba', function (req, res) {
   res.send("Realizo un delete");





app.listen(8080);
