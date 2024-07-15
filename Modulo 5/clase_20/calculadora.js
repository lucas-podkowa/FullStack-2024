
var sumar = function (x, y) {
    return (x + y);
}
var restar = function (x, y) {
    return (x - y);
}

let calculadora = function (algunCalculo, x, y) {
    return algunCalculo(x, y);
}



module.exports = { calculadora, restar, sumar };
