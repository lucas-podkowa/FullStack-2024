import React, { useEffect, useState } from 'react'

export default function Home() {

  /*
  () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(data => setPosts(data));
      },
      []
  */

  const [contador, setContador] = useState(0);
  const [suma, setSuma] = useState(0);
  const [posts, setPosts] = useState([]);

  const aumentar = () => {
    setContador(contador + 1);
  }

  function sumar() {
    setSuma(suma + contador);
  }

  useEffect(
    () => {
      // fetch('https://jsonplaceholder.typicode.com/posts')
      //   .then(
      //     function () {
      //       console.log('datos de la API')
      //     });

      //----------------------------------------------------------------

      /*
      disparo una peticion
      esta peticion demora, entonces tengo que decirle .then() "entonces"
      cuando termines de hacer la peticion voy a ver el resultado
      como el resultado es algo que aun no puedo entender porque es un mensaje http y la informacion esta en su
      interior en algun lado (posiboemente en el body en formato JSON), entonces transformame esos datos en algi que yo pueda entender
      es alli donde volvemos a decir .then() invocamos la funcion que tranforma esos datos y me retorna (return) los datos reales
      tranformados a algo que yo pueda entender... recien alli es que tenemos la informacion
      */

      // fetch('https://jsonplaceholder.typicode.com/posts')
      //   .then(response => response.json())
      //   .then(data => setPosts(data));


      function fech(url) {

      }


      async function obtener_datos() {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts')
        let data = await response.json();
        setPosts(data);
      }

      obtener_datos();




    },
    []
  );

  return (
    <>
      <button onClick={aumentar}>presionar</button>
      <button onClick={sumar}>Sumar</button>
      <h1> {'el valor del contador es: ' + contador}</h1>
      <h1> {'el valor de la suma es: ' + suma}</h1>

      <table className='
      table
      table-striped
      table-bordered
      table-hover'>
        <thead>
          <th>Titulo</th>
          <th>Descripcion</th>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>

  )
}
