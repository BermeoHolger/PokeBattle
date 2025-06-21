import '../assets/styles/forms.css'
import { use, useState } from 'react'
import { comenzarPartida, recuperarMazos, obtenerAtributosCartas } from '../api/api';
import { jwtDecode } from 'jwt-decode';

export const Jugar = () => {

  const [estadofondo, setEstadoFondo] = useState(false);
  const[mostrar, setMostrar] = useState(false);
  const [mazos, setMazos] = useState([]);
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null);
  const[cartas, setCartas] = useState([]);
  const[cartasServer, setCartasServer] = useState([]);
  const[jugada, setJugada] = useState(false);
  let id_partida;


  let token = sessionStorage.getItem("Token");
  
  let datos = null;
  let id_user = null;

  if (token) {
    datos = jwtDecode(token);
  }
  if (datos) {
    id_user = datos.usuario;
  }
  

  const mostrarOcultar = async () => {
    setEstadoFondo(!estadofondo);
    const data={id:Number(mazoSeleccionado)}
    try{
        console.log("Data enviada es: ",data);
        const response = await comenzarPartida(data,token);
        console.log("el post/partidas se llamó bien")
        const aux = response.data.cartas;        
        id_partida = response.data.id_partida;
        console.log("el id de la partida es:" + id_partida);

        if(Array.isArray(aux)){
            setCartas(aux);
        }else{
          setCartas([]);
        }
        const response2 = await obtenerAtributosCartas(1,id_partida);        
        console.log("se obtuvieron los tributos e ids del mazo del server");
        setCartasServer(response2.data);


    } catch (err) {
      console.log("Error en Comenzar partida");
       if (err.response && err.response.data) {
          setCartas(err.response.data);  // Caso error: setea el error que viene del backend
        } else {
          setCartas('Error desconocido');  // Por si no viene nada
        }
    }
  }

  const MostrarMenu= async()=>{    
    setMostrar(!mostrar);
    try {
        const response = await recuperarMazos(id_user,token);
        const mazosJsn = response.data;
        if (Array.isArray(mazosJsn)) {
          setMazos(mazosJsn);
        } else {          
          setMazos([]);
        }        
      } catch (err) {
        if (err.response && err.response.data) {
          setMazos(err.response.data);  // Caso error: setea el error que viene del backend
        } else {
          setMazos('Error desconocido');  // Por si no viene nada
        }
      }
  }

  const guardarSeleccion = (e) => {    
    setMazoSeleccionado(e.target.value);
    console.log("ID seleccionado:", e.target.value);
  };

  /*const manejarJugada=()=>{
    setJugada(!jugada);
    console.log("Se debe jugar la carta? " + jugada);
    try{

    }catch{

    }

  }*/

  return (
    <div>
        <h1>Pagina de juego</h1>
        <button onClick={MostrarMenu}>  {mostrar? "Dejar de Jugar" : "Comenzar a Jugar"}  </button>
        <div> {mostrar? 
          <>
            <div className={estadofondo ? "fondojuego" : ""}>  {estadofondo ? " *Mostrar fondo * " : " * NO Mostrar Fondo* "} </div>
            <div>{cartas? "No Mostrar Cartas* ": "Mostrar Cartas* "}</div>
            <table border="1">
              <thead>
                <tr><th>Seleccione el mazo a jugar</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><select onChange={guardarSeleccion} defaultValue="">
                    <option value="" disabled> Selecciona un mazo </option>
                      {mazos.map((mazo, index) => (
                    <option key={index} value={mazo.id}>  {mazo.nombre}  </option>
                      ))}
                  </select></td>
                </tr>
              </tbody>
            </table>
            <button onClick={mostrarOcultar}> {estadofondo ? "Terminar Partida" : "Iniciar Patida"}</button><br/>
            {mazoSeleccionado && (
              <p>ID del mazo seleccionado: {mazoSeleccionado}</p>
            )}
            <div className='filaDeCartas'>
            {cartas ? (
                cartas.map((carta) => (
                <div key={carta.id} className="cartaElegida">
                  <ul className="atributosCarta ">
                  <button className='botonEnviar ' > - {carta.nombre} - Atributo: {carta.atributo_nombre} | Ataque: {carta.ataque_nombre} | Poder de ataque: {carta.ataque}</button>
                  </ul>
                </div> ))                          
            ): (<></>)
            }
            </div>
            <hr/> {/* LINEA SEPARADORA QUE LUEGO HAY QUE BORRAR*/}
            <div>
              {id_partida? <div>
                "No hay atributos" 
                </div>
              : 
                <div className="filaDeCartas">
                {Object.entries(cartasServer).map(([id,atributo])=> (<button key={id}className="cartaElegida botonEnviar "> ID de la carta: {id} | Atributo: {atributo}</button>))}
                </div>

              
              }
            </div>

            {/* 
            EL botón 'crear partida' sirve para que al dar click llame al enpoint de get_mazos y se muestren como
            opciones de mazos a escoger los nombres de los mazos de cada user. (hecho)

            Cuando se elige el mazo, se guarda el id del mazo elegido para que se pueda hacer lo de abajo. (hecho)

            Agregar que cuando se de el click a 'Iniciar Partida' se use el id del mazo seleccionado para llamar
            al endpoint de post_partida y que asi las cartas del mazo pasen de en_mazo a en_mano y guardar en una variable extra las cartas que
            vienen en el json de respuesta del enpoint, junto con el id de la partida.(hecho)
            
            Agregar que: Las cartas del servidor se mostrarán en la parte superior, no serán visibles para el usuario, estarán dadas vuelta pero
             si se verá su atributo
            
             Para tener las cartas del servidor solo hace falta llamar al enpoint de get /usuarios/{usuario}/partidas/{partida}/cartas que 
             devuelve los atributos del mazo y el id de la carta de ese atributo.Asi luego con el id podemos llamar al post jugada que 
             me devuelve el id de la carta que jugo el servidor y solo con eso podemos dejar de mostrar la carta que tenga el mismo id. En las
             cartas delservidor solo hace falta mostrar el atributo y nada mas asi queno hace falta nuevo endpoint

            Agregar que se muestre el string de qué atributo tiene cada carta y no que se vea el numero de atributo.

            HOY: Mejoras en la NavBar y cambios en el almacenamiento del token. 
            */
           }
          </>
        : 
          <></>} 
        </div>
    </div>
  )
}
