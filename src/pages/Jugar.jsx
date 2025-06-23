import '../assets/styles/forms.css'
import '../assets/styles/jugar.css'
import { use, useState } from 'react'
import { comenzarPartida, recuperarMazos, obtenerAtributosCartas, mandarJugada } from '../api/api';
import { jwtDecode } from 'jwt-decode';

export const Jugar = () => {
  const [estadofondo, setEstadoFondo] = useState(false);
  const[mostrar, setMostrar] = useState(false);
  const [mazos, setMazos] = useState([]);
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null);
  const[cartas, setCartas] = useState([]);
  const[cartasServer, setCartasServer] = useState([]);
  const[jugada, setJugada] = useState(false);
  const[id_partida, setId_Partida] = useState(Number);
  const[botonesOcultos, setBotonesOcultos] = useState([]);
  const[ocultasServer, setOcultasServer]= useState([]);
  const[mostrarResultado, setMostrarResultado]= useState(false);
  const[resultado_jugada, setResultadoJugada ]= useState('');

  const [PlayAgainButton,setPlayAgainButton]=useState(false);

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
        setId_Partida(response.data.id_partida);
        console.log("el id de la partida es:" + response.data.id_partida);
        if(Array.isArray(aux)){
            setCartas(aux);
        }else{
          setCartas([]);
        }
        const response2 = await obtenerAtributosCartas(1,response.data.id_partida); //obtengo los atributos de las cartas del server       
        console.log("se obtuvieron los tributos e ids del mazo del server");
        console.log(response2.data);
        setCartasServer(Object.entries(response2.data));
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

  const manejarJugada= async(carta_id)=>{
    setBotonesOcultos([...botonesOcultos, carta_id]);
    setJugada(!jugada);
    setMostrarResultado(true);
    try{
      let data={
        idcarta: carta_id,
        idpartida: Number(id_partida)
      }
      console.log("Funciona el doble click para iniciar una jugada!")
      const response = await mandarJugada(data);
      const info = response.data;      
      if(Array.isArray(info) ){ //este if consulta si es la ultima jugada porque en la ultima jugada el backend cambia la respuesta a un array de dos objetos [0]y[1] para mandar el resultado de la partida
        setOcultasServer([...ocultasServer, info[0].carta_server]);
        if(info[0].resultado.ataque_server > info[0].resultado.ataque_user){
         setResultadoJugada('Gana el server :(');
        }else if(info[0].resultado.ataque_server < info[0].resultado.ataque_user){
          setResultadoJugada('Ganaste! :) ');
          } else{
              setResultadoJugada('Empate! :| ');
            }
        setResultadoJugada(prev=>prev + '  Esa fue la ultima jugada asi que el resultado de la partida es que el usuario ⇾ ' + '↬'+info[1].el_usuario +'↫');
        setPlayAgainButton(true);
        console.log(resultado_jugada);
        console.log("Esa fue la ultima jugada asi que el resultado de la partida es que el usuario: "+ info[1].el_usuario);
        console.log("la carta jugada por el server es la de id: "+ info[0].carta_server);
        console.log("el resultado de la jugada es: ataque del server: "+ info[0].resultado.ataque_server + " ataque del usuario: " + info[0].resultado.ataque_user);
      }else{
        setOcultasServer([...ocultasServer, info.carta_server]);
        if(info.resultado.ataque_server > info.resultado.ataque_user){
           setResultadoJugada('Gana el server :(');
        }else if(info.resultado.ataque_server < info.resultado.ataque_user){
          setResultadoJugada('Ganaste! :) ');
          } else{
              setResultadoJugada('Empate! :| ');
            }
        console.log("la carta jugada por el server es la de id: "+ info.carta_server)
        console.log("el resultado de la jugada es: ataque del server: "+ info.resultado.ataque_server + " ataque del usuario: " + info.resultado.ataque_user)
        console.log(resultado_jugada);
      }

    }catch(err) {

      console.log("NO Funciona el doble click para iniciar una jugada!")
      if (err.response && err.response.data) {
          console.log(err.response.data);  // Caso error: setea el error que viene del backend
        } else {
          console.log('Error desconocido');  // Por si no viene nada
        }
    }

  }

  return (
    <div> 
      <div> {!mostrar?  //boton comenzar a jugar
      ( <button onClick={MostrarMenu} className='button-85'>  {mostrar? "" : "Comenzar a Jugar"}  </button>) 
      : ("")} 
      </div>        
      <div> {mostrar? 
        <>            
          <div className="positablero"> <div className="fondoTablero"> </div> </div>

          <div className='opcionesLateral'>
            <table className='tablaCentrada'>
              <thead>
                <tr><th>Seleccione el mazo a jugar</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><select onChange={guardarSeleccion} defaultValue="">
                    <option value="" disabled > Selecciona un mazo </option>
                      {mazos.map((mazo, index) => (
                    <option key={index} value={mazo.id} >  {mazo.nombre}  </option>
                      ))}
                  </select></td>
                </tr>
              </tbody>
            </table>
            <div>{!estadofondo? 
              (mazoSeleccionado? 
                (<button onClick={mostrarOcultar} className='botonIniciar'> Iniciar Partida </button>)
              :
                (<button disabled className='botonIniciarProhibido'> Iniciar Partida </button>)
            )
            :(<></>)
            }           
            </div>
          </div>

          <div className="filaDeCartasUser">
            {cartas ? 
              (
                cartas.map((carta) => (
                <div key={carta.id} > 
                  {!botonesOcultos.includes(carta.id) && (
                      <ul> 

                      <button onDoubleClick={ ()=> manejarJugada(carta.id)}  className="botonCartas" >
                        -- {carta.nombre} -- <br/> Atributo: {carta.atributo_nombre} <br/> Ataque: {carta.ataque_nombre} <br/> Poder de ataque: {carta.ataque}
                      </button>

                      </ul>
                    )
                  }                                   
                </div> ))                          
              )
              : 
              (<></>)
            }
          </div>

          <div className="filaDeCartasServer">
            {cartasServer? 
              (
                cartasServer.map( 
                  ([id, atributo])=> (
                    <div key={id} > 
                      {!ocultasServer.includes(Number(id)) && 
                        ( <div key={id}className="cartasServer "> Atributo → {atributo} </div> )
                      }
                    </div>
                  )
                )
              )
              :
              (<></>)
            }
          </div>

          <div>
            {mostrarResultado &&
            <p className='mensajeJugada'>{resultado_jugada}</p>
            }
          </div>

          <div>{PlayAgainButton? 
          (<a href='/jugar'>
            <button className='botonPlayAgain'> ¿Jugar otra vez? </button>
          </a>)
          :
          (<></>)
          }

          </div>
        </>
      : 
        <></>} 
      </div>
    </div>
  )
}

{/* 
  Falta hacer que la carta que se juega vaya al centro junto con la del server, arreglar el css para que se vea bien el fondo y que las cartas 
  se mantengan alineadas a medida que se van borrando. 
  Agregar el nombre del usuario al navbar.
  Implementar que se muestren errores al intentar x cosas pq ahora se rompe todo

  NOTA: para jugar una partida primero seleccionar un mazo, luego para hacer una juagada se debe dar doble click a una carta para que se 
  envie. Y verificar que no exista una partida 'en curso' actualmente (borrar si hay alguna asi) y que ninguna carta de mazo_carta esté en 'en mano'. 
  Todas deben estar en 'descartado'.
  */
}