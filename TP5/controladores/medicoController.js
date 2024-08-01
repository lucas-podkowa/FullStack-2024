//--- requires ------------------------------------------
const express = require("express");
var app = express();
const morgan = require("morgan");
const medicoBD = require("./modelos/medicosModel");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");



//-------------------------------------------------------


app.get("/", (req, res) => {
    res.send("pagina de inicio de medicos");
});


app.post("/create", crear());
app.get("/medicos", listarTodo());
app.get("/:matricula", obtenerMedico());
app.delete("/delete/:matricula", eliminarMedico() );












//-------------------------------------------------------

crear = function (req, res) {

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



listarTodo = (req, res) => {
    medicos = medicoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}


eliminarMedico = (req, res) => {
    medicoBD.deleteMedico(req.params.matricula, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

obtenerMedico = (req, res) => {
    matricula = req.params.matricula;
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





//-------------------------------------------------------


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("Sevidor encendido y escuchando en el puerto 3000");
    }
});

module.exports = app;