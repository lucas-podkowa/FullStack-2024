let miModulo = require('./calculadora.js'); // Importando el módulo calculadora.js
var saludos = require('./saludos.js') //importanto el módulo saludos.js

// Usando la función restar directamente
let resultadoResta = miModulo.calculadora(miModulo.restar, 10, 4);
console.log('Resultado de la resta:', resultadoResta);

// También puedes usar la función sumar si lo deseas
let resultadoSuma = miModulo.calculadora(miModulo.sumar, 10, 4);
console.log('Resultado de la suma:', resultadoSuma);

//utilizando uno de los metodos del modulo saludos
saludos.despedir(); 