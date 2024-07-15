let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// dado que estas utilizando funciones, como alternativa se podria aprovechar para que directamente devuelva el resultado
// sin teener que hacer otro IF ELSE abajo sino evaluando todo junto dentro de la misma funcion

function nombremes(numero) {

    if (isNaN(numero)) { //Verificación de que el valor ingresado sea un número.
        return ("Entrada no válida. Debe ingresar un número del 1 al 12");
    } else if (numero < 1 || numero > 12) { //Verificación de que el valor ingresado este en rango.
        return ("Número fuera de rango. Debe ingresar un número del 1 al 12");
    } else { //si no ingreso en ninguna de las anteriores es porque el número es valido
        return ("El mes correspondiente al numero ingresado es " + meses[numero - 1]);
    }
}

let numeroMes = prompt("ingrese un numero de mes");
alert(nombremes(numeroMes));


//--- el error estaba en que en la funcion nunca evaluas que pasa con los numeros negativos. 

// function nombremes(numero) {
//     if (numero => 1 && numero <= 12) {
//         return meses[numero - 1]
//     }
// }

//--- Es decir, cuando ingresas un 0 el quiere mostrar meses[0-1] y meses[-1] no existe pero en ningun lado lo controlas
//--- una solucion seria agregar un ELSE a esa funcion con algo asi:
//---     else if (numero < 1 && numero > 12) {
//---         return "Numero no valido"
//---     }  

