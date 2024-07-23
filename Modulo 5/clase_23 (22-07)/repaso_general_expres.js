const express = require('express');
const app = express();

app.get('/api/:year', function (req, res) {
    res.send(JSON.stringify(req.query) + JSON.stringify(req.params))
});

/*
app.get('/api/persona', function (req, res) {
    res.send('listado de personas');
});


app.put('/api/persona/:este_falco', function (req, res) {
    res.send('datos del flaco modificad');
});

app.post('/api/reserva', function (req, res) {
    datos_de_la_reserva = req.body;
    res.send("datos de la reserva creada");
});

*/

app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});


/*
peticion que viene del cliente
    --> nos envia datos en/mediante una URL que llega en "request"->req
        por ejemplo: si decimos "req.algo" estamos seleccionando "algo" qie viene en esa peticion
    --> esa URL tiene partes
        --> req.params (hace referencia a lo que llega en la parte de PAHT de la URL )
        --> req.query (hacer referencia a lo que llega en la aprte de queryparams --> la aprte despues del "?" de la URL)


respuesta que le mando desde el servidor
    --respondemos a traves de "response" ->res
        --> puede ser una archivo --> res.sendFile()
        --> puede ser un texto --> res.send("texto que le estamos decolviendo")
        --> puede ser un objeto con datos (JSON) --> res.json({objeto json})



hago un clic en la pantalla para registrarme
esos datos lo cargo en el frontend posiblemente en algun formulario y cuando preciono el boton de "REGISTRARME" se guardan mis datos... en realidad lo que paso es que envié esos datos desde el cliente hasta un servidor que tomo dichos datos y lo almaceno en una base de datos

cuando precione REGISTRARME hice una peticion a aulgun endpont que tomo mis datos (www.misitema.com/usaurios/registro)

en el servidor exitira una ruta algo asi

app.post('/usaurios/registro', (req. res)=>{
 // aca se hace algo

 });
    
los datos llegaran con gran probabilidad dentro del body, que es una parte del "req", es decir en req.body voy a tener tooooodos los datos que estaban en el formulario. tomemos la funcion anterior


app.post('/usaurios/registro', (req. res)=>{
    var usuario = req.body
    respuesta_de_la_base_de_datos = base_de_datos.save(usuario);
    if(existe_error){
        //responder al cliente que hubo un error
        res.send(bd.error)
    }else{
        //le respondere al cliente que su registro fue existoso
        red.json(bd.newUser)
    }
});


esto es una version simplificada, expandamosla un poquito

esta funcion "base_de_datos.save(user);"" estara en otro archivo donde debemos configurar la conexion a nuestra base de datos y tener funciones que hagan diferentes cosas, como: 
    -crear un usuario
    -modificar un usuario
    -eliminar un usuario
    -obtener datos del usuario

    una de ellas es nuestra funcion llamada "save" a la que le envío por parametros algunos datos, es decir

    function save(user){
        new query = "insert into usuarios (nombre, apellido, mail) values (user.name, user.apellido, user.email)"
    }

*/
