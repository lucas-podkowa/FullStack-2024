const readline = require('readline');

//declaro o defino el uso de un prompt del lado del servidor con readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// me pregunta y luego dispara un callback (una funcion que se llama despues de...)
rl.question('donde tu vives ? ', function (pais) {
    console.log(`vive en ${pais}`);
    rl.close(); //disparo un evento llamado close
});

console.log('esto va despues de que ingrese el pais')


//cuando readline se da cuenta que dispare el evento close, invoca un callback que me dice bye bye
rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});
