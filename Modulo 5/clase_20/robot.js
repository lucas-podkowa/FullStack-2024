var eventos = require('events'); // cargamos la libreria de eventos

var control_remoto = new eventos();// creamos un nuevo manejador de eventos


var unaFuncionQueHaceAlgo = function () {
    console.log('El robot camina hacia el frente');
}

// cuando presionamos adelante
control_remoto.on('adelante', unaFuncionQueHaceAlgo);

// cuando presionamos atras
control_remoto.on('atras', function () { console.log('El robot camina hacia atras'); });

// cuando ordenamos saludar
// el robot se detiene
control_remoto.on('saludar', function () {
    console.log('Detener robot. y saludo a los presentes');
});
// el robot saluda
control_remoto.on('saludar', function () {
    console.log('El robot dice "Hola, soy Robotitus"!');
});
// utilizar controles
control_remoto.emit('adelante');
control_remoto.emit('atras');
control_remoto.emit('saludar');


/*
personas.crear(datos, respuesta(error, exito)){

hgacer una peticion a la base de datos con (datos) => 

    if(salio bien){
        return enviar a mi frontend una respuesta (exito)
    }else{
        return enviar a mi frontend una respuesta (error)
    }

}
*/
