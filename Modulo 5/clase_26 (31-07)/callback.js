
function primero(unaFuncion) {
    setTimeout(() => {
        console.log("primero");
        unaFuncion();

    }, 3000);
}

function segundo() {
    console.log("segundo")
}

primero(segundo());



primero(segundo);

