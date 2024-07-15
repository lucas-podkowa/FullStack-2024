//declaramos dos metodos sencillos que luego los exportamos para que estén disponibles

var decirHola = function () {
    console.log('Hola');
}

var despedir = function () {
    console.log('Chau');
}

module.exports = { decirHola, despedir };