// RESPASO JSON
//-------------------------------------------------------------------------------------------------------------

//declaro el objeto mate con algunos atributos y dos funciones
var mate = {
  altura: 15,
  material: "madera",
  color: ["marron", "plata", "perlado"],
  bombilla: {
    altura: 20,
    material: "Acero Inoxidable",
  },
  presentacion: function () {
    document.write(
      `Hola soy un mate de ${this.material} de unos ${this.altura} centimetros de altura`
    );
  },
  tienes_el_color: function (color) {
    let respuesta = null;
    if (this.color.includes(color)) {
      respuesta = `Porsupuesto, ¿quisieras comprar uno?`;
    } else {
      respuesta = `Lo lamenteo, no me fabricaron en color  ${color}`;
    }
    return respuesta;
  },
};
//llamo a la funcion presentacion() del mate, de modo que me mostrará un mensaje con su material y altura
mate.presentacion();

//llamo a la funcion tienes_el_color() y envío la plabla "plata" como parametro para que la funcion lo analizce
document.write(mate.tienes_el_color("plata"));

// idem al anterior pero ahora pasándole el color verde, para que no coincida con ninguno de sus colores y muestre el mensaje del else
document.write(mate.tienes_el_color("verde"));

//tambien puedo llamar a dicha funcion con un ALERT para variar un poco
alert(mate.tienes_el_color("plata"));

//-------------------------------------------------------------------------------------------------------------
// creamos algunos obejtos JSON, a diferencia de las CLASES, donde podemos declarar una clase y luego instanciarla en varios objetos
// con JSON tenemos que crear una estructura nueva por cada objeto que queremos representar

let p1 = {
  raza: "perro",
  nombre: "lobito",
  color: "negro",
};

let p2 = {
  raza: "perro",
  nombre: "dogy",
  color: "blanco",
};

//en JSON no existe la herencia, por lo que si declaro una funcion en un objeto, esta no se replica en los demas objetos
let p3 = {
  raza: "perro",
  nombre: "firulay",
  color: "gris",
  presentarme: function () {
    //codigo de la funcion donde este perro se presentaría
  },
};

//mostramos por pantalla el nombre de los perros
document.write(perro.nombre);



//CLASES
//-------------------------------------------------------------------------------------------------------------

//definimos la clase Animal con dos atributos y un constructor
class Animal {
  nombre = "pepe"; //aunque aqui asignamos un nombre por defecto, éste dato puede cambiar al momento de crear un objeto
  tipo;

  constructor(parametro1, parametro2) {
    this.nombre = parametro1;
    this.color = parametro2;
  }
}


//a diferencia de un JSON, un objeto derivado de clase se declara mediante la palabra "new" seguida de la clase a la cual estamos instanciando
// instanciar se puede entender como "crear un objeto a partir de ..."
let gato1 = new Animal("pepe", "blanco");
let perro1 = new Animal("juan", "neglo");
let insecto1 = new Animal("mariposa", "azul");

//mostramos por pantalla un par de datos de los objetos creados, aqui es similar a JSON
document.write(gato1.nombre);
document.write("</br>");//esto es simplemente un saldo de linea HTML para que el navegador muestre el contenido debajo y no pegado al costado
document.write(perro1.tipo);



//-------------------------------------------------------------------------------------------------------------
// creadmos una nueva clase llamada Personaje a la cual definimos sus atributos directamente dentro del constructor

class Personaje {

  constructor(nombre, energia) {
    this.name = nombre;   // creamos el atributo name y asignamos el valor que es recibido por parametro
    this.energy = energia;
    this.mana = 50;
    console.log(`¡Bienvenido/a, ${this.name}!`);  // Accedemos al valor actual de la prop. name para mostrar un mensaje al crearse el objeto

  }
}

const mario = new Personaje("Mario");   // '¡Bienvenido/a, Mario!'
let luis = new Personaje("Luis");
let dragon = new Personaje("Bowser");
let dragon2 = new Personaje("Drako", 90);

document.write(dragon2.name);



// HERENCIA
//-------------------------------------------------------------------------------------------------------------
// herencia es una caracteristica de la programacion orientada a objetos, 
// donde los atributos y metodos de una clase pueden transferirse a clases hijas mediante la palabra reservada EXTENDS

class Persona {
  nombre;
  apellido;
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }
  presentarme() {
    return `Hola, soy ${this.apellido} ${this.nombre}`;
  }
  //la estructura ${...} es un template de ES6 mediante el cual podemos introducir variables dentro de una cadena de texto
}

class Docente extends Persona {
  curso;
  constructor(nombre, apellido, curso) {
    super(nombre, apellido); //la palabra reservada super es utilizada para referirse a la clase padre
    this.curso = curso;
  }

  presentarme() {
    return super.presentarme() + `y mi curso es ${this.curso}`;
  }
}

// segun las lineas anteriores, Docente es una subclase o clase hija (heredada) de Persona.
// vease que utilizamos la palabra super en la clase hija, basicamente es llamar a un "this." de la clase raiz de la cual estoy extendindo

p = new Persona("Lucas", "Podkowa");
d = new Docente("Jose", "Artigas", "Full-Stack");

document.write(p.presentarme());
document.write(d.presentarme());
