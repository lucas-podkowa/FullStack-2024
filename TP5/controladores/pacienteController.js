//--- requires ------------------------------------------
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const medicoBD = require("./../modelos/medicosModel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para MEDICO --- 
// --------------------------------------------------------

app.get("/", listarTodo);

app.get("/:especialidad", getByEspecialidad);



app.post('/create', crear);
app.get('/:nhc', obtenerPaciente);
app.delete("/:nhc", eliminarMedico);
app.put("/:nhc", modificarMedico);







// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function listarTodo(req, res) {
    medicos = medicoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function getByEspecialidad(req, res) {
    medicos = pacienteBD.metodos.getByEspecialidad((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    medicoBD.metodos.crearMedico(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


function obtenerPaciente(req, res) {
    let matricula = req.params.matricula;
    medicoBD.metodos.getMedico(matricula, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
        }
    });
}

//app.put("/:matricula", modificarMedico);



function modificarMedico(req, res) {
    datosMedico = req.body;
    deEsteMedico = req.params.matricula;
    medicoBD.metodos.update(datosMedico, deEsteMedico, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //medico modificado
        }
    });
}


function eliminarMedico(req, res) {
    medicoBD.metodos.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;