// //obtenerPacientes
// app.get("/api/pacientes", (req, res) => {
//     consulta = "select * from paciente";
//     connection.query(consulta, function (err, resultados, fields) {
//         if (err) {
//             res.send(err);
//             return;
//         } else {
//             res.json({
//                 messaje: "Resultados de la consulta",
//                 detail: resultados,
//             });
//         }
//     });
// });