const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var mysql = require("mysql");

//nosotros somos uno agenos, debemos comunicarnos con el motor, asi como haciamos con workbench

// Agregue las credenciales para acceder a su base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "clinica",
});

connection.connect((err) => {
  if (err) {
    console.log(err.code);
  } else {
    console.log("BD conectada");
  }
});


app.get("/medicos", (req, res) => {
    consulta = "select * from medico";
 });


app.listen(8080, () => {
  console.debug("App escuchando puerto :8080");
});
