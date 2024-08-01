//codigo encargado de gestionar los datos con la base de datos de los medicos

const mysql = require("mysql");
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

const algo = "un Apellido"

var metodos = {}

metodos.getAll = function (callback) {

    consulta = "select * from medico";

    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(udefined, {
                messaje: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}





metodos.getMedico = function (matricula, callback) {
    consulta = "select * from medico where matricula = ?";

    connection.query(consulta, matricula, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un medico con la matricula:" + matricula)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }

            callback(resultados);
        }

    });

}

metodos.crearMedico = function (datosMedico, callback) {
    
    
    medico = [
        datosMedico.matricula,
        datosMedico.nombre,
        datosMedico.apellido,
        datosMedico.especialidad,
        datosMedico.observaciones,
    ];

    query =
        "INSERT INTO MEDICO (matricula, nombre, apellido, especialidad, observaciones) VALUES (?, ?, ?, ?, ?)";
    
    connection.query(query, medico, (err, rows) => {
            
        if (err) {
            callback(err);
        } else {
            callback(undefined, {
                message: "el medico " + datosMedico.nombre + " " + datosMedico.apellido + "se registro correctamente",
                detail: rows,
            })
        }

        });
}






















metodos.deleteMedico = function (matricula, callback) {
    query = "delete from medico where matricula = ?";
    connection.query(query, matricula, function (err, rows, fields) {
        if (err) {
            callback.json({
                message: "ha ocurrido un error",
                detail: err,
            });
            return;
        }

        if (rows.affectedRows == 0) {
            callback(udefined, "No se encontro un medico con la matricula " + matricula);
        } else {
            callback(undefined, "el medico " + matricula + " fue eliminado de la Base de datos");
        }
    });
}

module.exports = { metodos }




