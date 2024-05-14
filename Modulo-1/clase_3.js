//-------- 01 - ESTRUCTURAS DE CONTROL (sentencia SWITCH) -------------------------------------
//Veremos ejemplos de la estructura IF y como puede convertise en una estructura SWITCH

// Ej: En las elecciones debemos repartir a las personas según la terminación de su DNI:
// 0, 1 y 2 votaran en el autodromo,
// 3, 4 y 5 votaran en la costanera
// 6, 7 y 8 en la terminal de colectivos
// 9 no votaran en esta ocacion

// con un IF aninado ariamos algo asi:
let dni = prompt("ingrese los tres ultimos digitos de su DNI")

 if (dni.endsWith("0") || dni.endsWith("1") || dni.endsWith("2")) {
     console.log("Usted vota en el Autodromo");
 } else if (dni.endsWith("3") || dni.endsWith("4") || dni.endsWith("5")) {
     console.log("Usted vota en la Costanera");
 } else if (dni.endsWith("6") || dni.endsWith("7") || dni.endsWith("8")) {
     console.log("Usted vota en la Terminal de Autobuses");
 } else {
     console.log("Usted no vota en ésta oportunidad");
 }

// ahora con un switch una de las alternativas es hacer uso del metodo de cadena 
// slice() para averiguar el ultimo digito
 dni = prompt("ingrese los tres ultimos digitos de su DNI")
 let ultimoCaracter = dni.slice(-1);

 switch (ultimoCaracter) {
     case "0":
     case "1":
     case "2":
         console.log("Usted vota en el Autodromo");
         break;
     case "3":
     case "4":
     case "5":
         console.log("Usted vota en la Costanera");
         break;
     case "6":
     case "7":
     case "8":
         console.log("Usted vota en la Terminal de Autobuses");
         break;
     default:
         console.log("No vota en esta ocasión");
}



//-------- 02 - METODOS DE REPETICION (WHILE) -------------------------------------
/*
    while (condition) { se evalua una condicion para saber si entrar al bucle
        // codigo que se ejecuta repetidamente hasta que la condicion sea falsa
    }
*/

//Ejemplo Nº 1: Declaro una variable "edad" y luego consulto voy aumentando su valor en 1 hasta salir del bucle


 edad = 9;
 while (edad < 18) {
     console.log("usted aun no es mayor de edad");
     edad++;
}


//Ejemplo N° 2: escribir un programa que ejecute metodo del factorial de un numero menor a 10, 
//dicho numero sera ingresado por el usuario y si no es menor a 10, debo responder que no soy capaz de resolverlo

 let valor = prompt("Ingrese un numero por favor");
 let resultado = 1, contador = 1;

 if (valor < 10) {
     while (contador <= valor) {
         resultado *= contador;
         contador++;
     }
     console.log("el numeral es " + resultado);
 }else{
     alert("solo calculamos factoriales de valores menores a 10")
 }


//Ej N°2: iniciamos una variable en 0 y mientras dicha variable sea menor que 10 debemos imprimirla por panralla
// sin embargo queremos que esa impresion se salte los numeros pares y ademas finalize al llegar al 7

// let numero = 0;
// while (numero < 10) {
//     if (numero % 2 != 0) {
//         document.write(numero);
//     }
//     if (numero == 7) {
//         document.write(" Encontramos el 7, asi que hasta acá llegamos :(")
//         break; //finalizamos el bucle
//     }
//     numero++;
// }



//-------- 03 - METODOS DE REPETICION (FOR) -------------------------------------
// EJ N°1 : imprime por consola los apellidos de un array

let apellidos =["Peres", "diaz", "aguirre", "nogueira", "rodriguez"]

for (let i = 0; i < apellidos.length; i++) {
    console.log(apellidos[i]);
}

// EJ N°2 : recorrer los numeros del 0 al 5 pero salteando el numero 3
for (let i = 0; i <= 5; i++) {
    if (i == 3) {
        continue;
    }
    console.log(i);
}

// variante FOR IN 
//la forma correcta de utilizar "for in" es utilizando la variable como un puntero
let animales = ["perro", "gato", "pato", "tigre"]
for (let puntero in animales) { //for in imprime la posicion
    console.log("FOR IN imprime: " + puntero);
}

// variante FOR OF
for (let animal of animales) { //for in imprime el contenido
    console.log("FOR OF imprime: " + animal);
}


//-------------------------------------------------------------------------------------

//for in  --> recorre el array y devuelve las posiciones
//for of  --> recorre el array y devuelve el contenido de la posicion que esta apuntando en ese momento

Por ejemplo: declaramos un array de nombres con cuatro posiciones
 
let nombres = ["ana", "pepe", "juan", "lucas"];

//si recorremos con el for normal, debemos ir avanzando el puntero/posicion para ir mostrando el contendio en esa posicion

for (let posicion = 0; posicion <= nombres.lengt; posicion++) {
     console.log(nombres[posicion]);
}

//si utilizamos for in, nos mostrara el valor de la posicion en la que se encuentra
for (led pos in nombres) {
     console.log("estoy parado en :" + pos);
}

//si utilizamos for of, nos mostrara el contenido del array a medida que avanza por el mismo
for (let algo of nombres) {
    console.log("el contenido es: " + algo);
}

//-------------------------------------------------------------------------------------

//Ejemplo 2°: tenemos un array de arrays donde cada elemento del array principal
//           en realidad es otro array con los datos de la persona con su edad
// debemos realiar una funcion que imprima el nombre y la edad del mayor de estos 

//declaramos el array con el nombre de 'conjunto'
conjunto = [["lucas", 34], ["mony", 25], ["ana", 60], ["jose", 19]];

//llamamos a la funcion que en realidad esta definida mas adelante
averiguar_el_mayor(conjunto);


//en la definicion, recibo como parametro al conjundo de datos
function averiguar_el_mayor(datos_recibdos) {

    let mayor = datos_recibdos[0]; //por el momento el mayor será la primer persona

    for (let persona of datos_recibdos) {

        console.log(persona);
        if (persona[1] > mayor[1]) { //persona[1] hace referencia a la edad
            mayor = persona;
        } else {
            console.log(persona[0] + " no es la mayor"); //persona[0] hace referencia al nombre
        }
    }
    alert("la persona con mas edad es " + mayor[0].toUpperCase() + " y tiene " + mayor[1] + " años");
}

