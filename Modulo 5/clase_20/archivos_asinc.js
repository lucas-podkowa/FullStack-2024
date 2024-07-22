var fs = require('fs'); // Llamar modulo fs.
// Llamar de manera sincrona.

var alTerminar = (err, contenido) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(contenido);
}

fs.readFile(__dirname + '/robot.js', 'utf8', alTerminar);


console.log('Fin!');





//---------------------------

