// /*
// Crear un programa que recibe 5 (cinco) notas de un alumno, 
// las mismas deben ser ingresadas por el usuario y 
// ser naturales < 11. 
// Debe calcular el promedio e imprimir en pantalla 
// si el valor de media es < 5“Reprobado”, 
// entre 6 y 8 “Aprobado” y si 
// es mayor a 8 “Sobresaliente”
// */


// let i = 0
// let notas = [];
// let suma = 0;


// while (i < 5) {

//     let nota = parseInt(prompt("Ingrese la Nota N°" + i));
//     if (nota >= 0 && nota < 11) {
//         notas[i] = nota
//         suma += notas[i];
//         i++;
//     } else {
//         alert("Nota invalida, por favor ingrese otro valor");
//     }
// }

// document.write(suma + "</br>");

// let promedio = (suma / notas.length);


// // console.log(notas);
// document.write(promedio);

// if (promedio <= 5) {
//     document.write("Reprobado");
// } else if (promedio > 5 && promedio <= 8) {
//     document.write("Aprobado");
// } else {
//     document.write("Sobresaliente");
// }



// {
//     "personas" : [
//         {
//             "Nombre": "Pedro",
//             "Apellido": "Guzman",
//             "DNI": 2123132131,
//             "Telefono": 3755121314,
//             "Localidad": "Leandro N. Alem"
//         },
//         {
//             "Nombre": "Pedro",
//             "Apellido": "Guzman",
//             "DNI": 2123132131,
//             "Telefono": 3755121314,
//             "Localidad": "Leandro N. Alem"
//         },
//         {
//             "Nombre": "Pedro",
//             "Apellido": "Guzman",
//             "DNI": 2123132131,
//             "Telefono": 3755121314,
//             "Localidad": "Leandro N. Alem"
//         },
//         {
//             "Nombre": "Pedro",
//             "Apellido": "Guzman",
//             "DNI": 2123132131,
//             "Telefono": 3755121314,
//             "Localidad": "Leandro N. Alem"
//         },

//     ]
// };


meses = ["ene", "feb", "mar"];

let mes = parseInt(prompt("Ingrese el numero de algun mes"));
if (mes >= 1 && mes <= 12) {
    alert(meses[mes - 1]);
} else {
    alert("Mira loco, ese mes no existe");
}

