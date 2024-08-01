base = [
    {
        "nombre": "Med1",
        "matricula": 1
    },
    {
        "nombre": "Med2",
        "matricula": 2
    },
    {
        "nombre": "Med3",
        "matricula": 3
    }];


//dados dos procesos, para asegurarme que el segundo proceso se ejecute si o si despues del primero
//solucion: decirle al primero que ejecute el segundo despues que haya finalizado (y le paso el segundo)

//problema: envio datos desde el frontend para actualizar el precio de un producto
//debo cambiar ese dato en la base de datos (que tiene su demorita) y mostrar inmediatamente el nuevo recio por pantalla
//conclifto: que no puedo mostrar por pantalla el nueov precio si aun no esta actualizado en la base de datos
//solucion: ejecutar la actualizacion en la base de daros, y cudo esta se termine de actualizar, que invoque la actualizacion de la pantalla



function getDatos(ejecutaEstaFuncion) { //simulacion de una consulta a la base de datos
    setTimeout(() => { //nuestra simulacion del tiempo necesario para que vaya a buscar los datos
        ejecutaEstaFuncion(base);
    }, 4000);

}


getDatos(getEdades);
getNombres


// //let medicos = getDatos(); //es la invocacion


//getNombres(getDatos());
getDatos(getNombres);


// //getEdades(getDatos());
// getDatos(getEdades);

function getNombres(medicos) {
    for (const medico of medicos) {
        console.log(medico.nombre);
    }
}

function getEdades(medicos) {
    for (const medico of medicos) {
        console.log(medico.matricula);
    }
}




