//--------- forma clasica de llammar una funcion -------------------------//
function saludar() {
    return "Hello World 1";
}
console.log(saludar()); //invocamos dicha funcion


//--------- declarando una funcion y asignandola a una variable ----------//
saludar2 = function () {
    return "Hello World 2";
}
console.log(saludar2());


//--------- utilizando funcion flecha -----------------------------------//
saludar3 = () => {
    return "Hello World 3";
}
console.log(saludar3());


//--------- utilizando funcion flecha con parametros --------------------//
saludar4 = (nombre) => {
    return "Hello " + nombre;
}
console.log(saludar4('pepe'));