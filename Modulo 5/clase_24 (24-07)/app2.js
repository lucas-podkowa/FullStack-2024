const express = require('express');
//const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('tiny'));

//morgan(':method :url :status :res[content-length] - :response-time ms');

//imprimimos en consola la cabecera recibida en el req
// app.use(function (req, res, next) {
//     var data = {
//         "httpVersion": req.httpVersion,
//         "headers": req.headers,
//         "url": req.url,
//         "method": req.method,
//         "query": req.query
//     };
//     console.log(JSON.stringify(data));
//     next();
// });

var personas = [];

//listamos personas
app.get('/api/persona', function (req, res) {
    res.send(personas);
});

//creamos persona
app.post('/api/persona', function (req, res) {
    var persona = {
        "nombre": req.body.nombre,
        "apellido": req.body.apellido,
        "dni": req.body.dni,
    };
    //personas es mi array de personas, la BD
    for (var index in personas) {
        var personaExistente = personas[index];
        if (req.body.dni == personaExistente.dni) {
            res.send(`Ya existe la persona ${personaExistente.nombre} ${personaExistente.apellido} ${personaExistente.dni}`);
            return;
        }
    }
    personas.push(persona);
    res.send(`Se creó la persona ${persona.nombre} ${persona.apellido} ${persona.dni}`);
});

//modificamos persona
app.put('/api/persona', function (req, res) {
    var dni = req.body.dni;

    for (var index in personas) {
        var persona = personas[index];
        if (persona.dni == dni) {
            persona.nombre = req.body.nombre;
            persona.apellido = req.body.apellido;

            res.send(`Se modificó la persona ${persona.nombre} ${persona.apellido} ${req.body.dni}`);
            return;
        }
    }

    res.send(`La persona con dni  ${req.body.dni} no existe`);


});

//eliminamos persona
app.delete('/api/persona/:dni', function (req, res) {
    var dni = req.params.dni;
    for (var index in personas) {
        var persona = personas[index];
        if (persona.dni == dni) {
            //eliminamos 1 elemento desde la posicion del indice
            personas.splice(index, 1);
            res.send(`Se eliminó la persona ${req.params.dni}`);
            return;
        }
    }
    res.send(`No se encontró la persona ${req.params.dni}`);
});




/*
//partes de una pagina web
    herramientas: nodeJS, express, mysql, VSCode
    partes del Bk:
                    -model (conexion y consultas a la base de datos)
                        -- de al menos 4 tablas
                        -- sistema clinico (seguimientos de pacientes)
                        -- tablas: paciente, medico, ingreso, usuarios 
                                 : producto, proveedor, pedidos, usuarios  
                    -controller (archivos que gestionan cada tabla)
                        --endpoints
//backend


//forndedn
    registrarse y loguearse, ABMC(CRUD) producto, AMBC proveedor y ABMC de pedido


*/