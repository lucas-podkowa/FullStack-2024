 

class Persona  {
    nombre;
    apellido;
    
    constructor(nombre,apellido,peso){
        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso;
    }

    presentarme(){
        return `${this.apellido} ${this.nombre}`;
    }

    static saludarA(nombre){
        console.log(`Buenos dias ${nombre}`);
    }
}

Persona.saludarA("Pedro");


class Alumno extends Persona{ 
    notas;  
    constructor(nombre,apellido,notas){
        super(nombre,apellido);
        this.notas = notas;
    }

    presentarme(){
        return super.presentarme() + " (Alumno)";
    }
}

class Docente extends Persona{ 
    curso;
    constructor(nombre,apellido,curso){
        super(nombre,apellido);
        this.curso = curso;
    }
}



//person.firstname + " is " + person.age + " years old.";

const miarrar = ["Banana", "Orange", "Apple", "Mango"];
miarrar.push("Kiwi")

fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];

var alu = new Alumno();
alu.nombre = "Arturo"
alu.apellido = "Gonzalez";
alu.peso = 50;
 




var alu2 = new Alumno();
alu2.nombre = "Aleli";
alu2.apellido = "Schaffer";

var doc = new Docente();
doc.nombre = "Miguel";
doc.apellido = "Cicha"



console.log(doc.presentarme());
console.log(alu.presentarme());
console.log(alu2.presentarme());

