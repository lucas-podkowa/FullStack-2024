var fs = require('fs'); // Llamar modulo fs.
// Llamar de manera sincrona.

var alTerminar = function (err, contenido) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(contenido);
}

fs.readFile(__dirname + '/es6Eventos.js', 'utf8', alTerminar);


console.log('Fin!');





//---------------------------

