import { useState } from 'react'

export default function Componente() {

    const handlerChange = (e) => {
        setNombre(e.target.value); //actualizo el estado de nombre con el valor del input al hacer un cambio en el mismo input
    };

    let [contador, setContador] = useState(0);
    const [nombre, setNombre] = useState('lucas')

    //las variables normales ya no son solamente un dato sino un array donde
    //la primer posision es ese dato y la segunda es una funcion que mantiene actualizado ese dato

    return (
        <div>
            <input onChange={handlerChange} type="text" />
            <button onClick={() => { setContador(contador += 1) }} >+</button>
            <h1>{contador}</h1>
            <h2>{nombre}</h2>

        </div>
    )
}

//
