import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// utilizando la libreria 'react-dom' se utiliza JS para crear un nuevo elemento dentro del <DIV> root
// el metodo .render() es propio de la libreria 'react'