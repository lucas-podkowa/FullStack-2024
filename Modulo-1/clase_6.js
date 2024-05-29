
 //CLASES --> atributos y metodos ESTATICOS
 //-------------------------------------------------------------------------------------------------------------

class Prenda {
    talle;
    precio;
    static moneda = 'u$d';

    constructor(p1, p2) {
        this.talle = p1;
        this.precio = p2;
    }
}

class Calzado extends Prenda {
    tipo;
}


// creamos un objeto de la clase Calzado y le enviamos ciertos argumentos, pero dicha clase no tiene un constructor para ellos
// funciona de todos modos porque implicitamente se llama a un constructor por defecto y en éste caso Calzado exiende de Prenda
// por lo que Calzado ejecuta al costructor de Prenda asignando el talle y el precio
zapatito = new Calzado("42", 6500);

// tambien podemos asignar un valor (cambiarlo) una vez que el objeto esta creado
zapatito.tipo = 'Deportivo';

document.write(`Talle: ${zapatito.precio} a $${zapatito.talle} del tipo  ${zapatito.tipo}`)

// para vizualizar un atributo estatico no lo hacemos mediante el objeto sino mediante la propia CLASE
document.write(`Son ${Prenda.moneda} ${zapatito.precio} </br>`)

// no confundir "estatic" con "const" ya que simplemente es un atributo de la clase y no del objeto, pero que SÍ se puede modificar 
Prenda.moneda = 'r$'
document.write(`Son ${Prenda.moneda} ${zapatito.precio}`)




 //-------------------------------------------------------------------------------------------------------------
    //declaramos una clase Persona tanto con un atributo como con un metodo estatico

class Persona {

    static unidadPeso = "Kg";

    constructor(nombre, apellido, peso) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso
    }

    static saludarA(parametro) {
        return (`Buenos dias ${parametro}`);
    }
    presentarme() {
        return `${this.apellido} ${this.nombre}`;
    }

    pesoATexto() {
        return `Hola soy ${this.nombre}, mi peso es de ${this.peso} ${Persona.unidadPeso}`;
    }
}

let pepito = new Persona("Pepito", "perez", 70);

//para invocar un metodo normal (no estatico) lo hacemos a travez del OBJETO
document.write(pepito.pesoATexto());

// en cambio, para invocar un metodo estático lo hacemos mediante la CLASE
document.write(Persona.saludarA("Lucas"));

// recordando que las propiedades y metodos estaticos son propias de la clase y no de instancias de la clase
// no se pueden invocar desde un objeto, para hacerlo hay que llamar a la clase en si misma





 // Sobreescribiendo metodos heredados
//-------------------------------------------------------------------------------------------------------------
    // hace referencia a invocar distintos metodos pero que tengan el mismo nombre
    // leer mas informacion al respecto buscando en google: "poliformismo en programacion orientada a objetos"


 class Alumno extends Persona{
    notas; 
    constructor(nombre,apellido,notas){
        super(nombre,apellido);
        this.notas = notas;
    }
    // aunque la clase Persona ya tiene un metodo con el mismo nombre, aqui quiero agregar informacion extra
    // por lo que puedo concatenar la funcion del padre utilizando la palabra super. a una leyenda propia de éste metodo hijo
    presentarme(){
        return super.presentarme() + '(Alumno)';
    }

    //tambien puedo utilizar un metodo del padre dentro de un metodo hijo, sin necesidad de sobreescribir nada
    listarNotas(){
        console.log(super.presentarme() + ` notas: ${this.notas}`);
    }
 }


 //mas de lo mismo, aqui definimos una segunda clase que tambien extiende de persona
 class Docente extends Persona {
   curso;
   constructor(nombre, apellido, curso) {
     super(nombre, apellido);
     this.curso = curso;
   }
 }

 var docente1 = new Docente("Miguel", "Cicha", "Nivel 2");
 console.log(docente1.presentarme());

 var alumno1 = new Alumno("Arturo", "Gonzalez", "10,8");
 console.log(alumno1.presentarme());
 console.log(alumno1.listarNotas());

 var persona = new Persona("mundy", "schulz", 80);
 var persona2 = new Persona("pedro", "zapata", 70);

 console.log(persona.saludarA());
 console.log(persona2.pesoATexto());

// modificamos un atributo estatico solo para dar un ejemplo similar a lo que hicimos anteriormente con Prenda.moneda 
Persona.unidadPeso = "Toneladas";




//--------------- DATE----------------------

//let new Date() = pepitoLindo;

// declarando una valiable llamada new 
// DATE();
// sera igual tendra almacenada a algo llamado pepitoLindo

// necesitamos una variable que tenga algun nombre, y que esa variable
// sea (tenga en su interior) una fecha

let pepitoLindo = new Date();
//ok ok toma la fecha de ahora xq no me dijiste la fecha que queres

//document.write(pepitoLindo.getHours() + ":" + pepitoLindo.getMinutes());
document.write(pepitoLindo.getMonth());
///

// let Nombre_de_la_variabele = valor_a_almacenarse_en_la_variable

// let pepitoLindo = new Date();
// //document.write(ahora);
// //Miercoles 22 de Mayo de 2024

// let dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];
// //              0       1           2           3           4           
let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];

document.write(meses[pepitoLindo.getMonth()]);

// //document.write(pepitoLindo);
// //document.write(ahora.getDay());

// document.write(`${dias[pepitoLindo.getDay()]},${pepitoLindo.getDate()} de ${meses[pepitoLindo.getMonth()]}
// del año ${pepitoLindo.getFullYear()}`);

// // document.write(meses[ahora.getMonth()]);
// // document.write(dias[ahora.getDay()]);


// let misTios = ["Hipolito", "Victor", "Miguelina", "Vicente", "Claudio"]
// console.log(dias[3]);
// console.log(dias);
// console.log(misTios.length);

// /* DATE es la clase (mi receta)
//  - dia de la semana en numero getDay()
//  - dia de la semana en palabras
//  - el mes del año en palabras
//  - el mes del año en numeros
//  - año en forma numerica
//  - minutos
//  - segundos

// --- return = create como si fueras ahorita mismo, ya

// unaFechaCualquiera = new Date();  --> (3, wednesday, may, 4)


// */




// /*

// receta: Pan ---> CLASE
//  - ingredientes
//  - modo de preparacion
//  - tiempo de ejecucion
//  - sabor
//  - punto Optimo de coccion
//  - peso en gramos


//  cuando implemento, hago, creo o llevo a cabo esa receta. Es decir, cuando 
//  creo una INSTANCIA de esa receta, se tranforma en mi producto

// producto:  ----> Objeto de la CLASE
// 1/2 de pan del otro dia
// galleta de hoy

// --------------------------
// galleta de hoy surgio al aplicar una receta de PAN


// galleta -> ingredientes (hariao)
//         -> sabor (malo)
//         -> punto de coccion (pasado) 

// 1/2 del otro dia -> ingredientes (hariao)
//                  -> sabor (bueno) ¿quetal esta de sabor? getSabor()
//                  -> punto de coccion (optimo)  ¿que punto de coccion tiene? getCoccion()





// */





