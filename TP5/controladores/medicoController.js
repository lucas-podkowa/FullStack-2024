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
app.post('/create', crear);
app.get('/:matricula', obtenerMedico);
app.delete("/:matricula", eliminarMedico);




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

function crear(req, res) {
    medicoBD.metodos.crearMedico(req.body, (err, exito) => {
        if (err) {
            res.json({
                message: "ha ocurrido un error",
                detail: err,
            });
            return;
        }
        res.json(exito);
    });
}


function obtenerMedico(req, res) {
    let matricula = req.params.matricula;
    medicoBD.getMedico(matricula, () => {
        (err, exito) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(exito)
            }
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