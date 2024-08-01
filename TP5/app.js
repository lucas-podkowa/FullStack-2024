
const express = require("express");
var app = express();
const morgan = require("morgan");
const medicoBD = require("./modelos/medicosModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
morgan(":method :url :status :res[content-length] - :response-time ms");

app.get("/", (req, res) => {
  res.send("pagina de inicio funcionando perfectamente");
});

const medicoController = require("./controladores/medicoController");
const pacienteController = require("./controladores/pacienteController");

//cuando viene una llamada se que tengo que enviarle a algun controlador que lo gestione
//en la URL tengo la pista (info) de donde enviar

app.use("/api/medico", medicoController);
app.use("/api/paciente", pacienteController);


app.listen(8080, (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Sevidor encendido y escuchando en el puerto 3000");
  }
});
