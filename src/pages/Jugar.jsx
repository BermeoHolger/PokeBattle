import '../assets/styles/forms.css'
import { useState } from 'react'

export const Jugar = () => {

  const[estadofondo, setEstadoFondo]= useState(false);  
  const mostrarOcultar=()=>{
    setEstadoFondo(!estadofondo);    
  }

  return (
    <div>
      <h1>Pagina de juego</h1>
      <div>
        <div className={estadofondo ? "fondojuego": ""}>El fondo se muestra?: {estadofondo ? "SI": "NO"} </div>
      </div>
      <button onClick={mostrarOcultar}> {estadofondo ? "Terminar Partida": "Iniciar Patida"}</button>      
    </div>
  )
}
