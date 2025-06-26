
import '../assets/styles/jugar.css'
import { use, useState } from 'react'
import { comenzarPartida, recuperarMazos, obtenerAtributosCartas, mandarJugada, getCartasMazo } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Jugar = () => {
  const [estadofondo, setEstadoFondo] = useState(false);
  const [mazos, setMazos] = useState([]);
  const [mazoSeleccionado, setMazoSeleccionado] = useState(null);
  const[cartas, setCartas] = useState([]);
  const[cartasServer, setCartasServer] = useState([]);
  const[jugada, setJugada] = useState(false);
  const[id_partida, setId_Partida] = useState(Number);
  const[cartasServerTotal, setCartasServerTotal] = useState([]);
  const[botonesOcultos, setBotonesOcultos] = useState([]);
  const[ocultasServer, setOcultasServer]= useState([]);
  const[mostrarResultado, setMostrarResultado]= useState(false);
  const[resultado_jugada, setResultadoJugada ]= useState('');
  const[error, setError] =useState('');
  const [PlayAgainButton,setPlayAgainButton]=useState(false);
  const [ultimaCarta, setUltimaCarta] = useState(null); 
  const [ultimaCartaServ, setUltimaCartaServ] = useState(null); 
  const atributos = {1: 'Fuego',2: 'Agua',3: 'Tierra',4: 'Normal',5: 'Volador',6: 'Piedra',7: 'Planta'};
  let token = sessionStorage.getItem("Token");
  
  let datos = null;
  let id_user = null;
  

  if (token) {
    datos = jwtDecode(token);
  }
  if (datos) {
    id_user = datos.usuario;
  }
  const navigate = useNavigate();
  useEffect (() => {
    if(!token){
      navigate("/login");
    }
    const fetchDatos = async () => {
    try {
        const responseCartas = await getCartasMazo(1);
        if(responseCartas){
          setCartasServerTotal(responseCartas);
        }
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
    fetchDatos();
  }, [token,navigate]);

  const mostrarOcultar = async () => {
    setEstadoFondo(!estadofondo);
    const data={id:Number(mazoSeleccionado)}
    try{
        const response = await comenzarPartida(data,token);
        const aux = response.data.cartas;        
        setId_Partida(response.data.id_partida);
        if(Array.isArray(aux)){
            setCartas(aux);
        }else{
          setCartas([]);
        }
        const response2 = await obtenerAtributosCartas(1,response.data.id_partida); //obtengo los atributos de las cartas del server       
        setCartasServer(Object.entries(response2.data));
        console.log(response2.data);
    } catch (err) {
       if (err.response && err.response.data) {
          setCartas(err.response.data);  // Caso error: setea el error que viene del backend
        } else {
          setCartas('Error desconocido');  // Por si no viene nada
        }
    }
  }

  const guardarSeleccion = (e) => {    
    setMazoSeleccionado(e.target.value);
  };

  const manejarJugada= async(carta_id)=>{
    setBotonesOcultos([...botonesOcultos, carta_id]);
    const cartaEncontrada = cartas.find(carta => carta.id === carta_id);
    setUltimaCarta(cartaEncontrada);
    setJugada(!jugada);
    setMostrarResultado(true);
    setError('');
    try{
      let data={
        idcarta: carta_id,
        idpartida: Number(id_partida)
      }
      const response = await mandarJugada(data);
      const info = response.data;     
      if(Array.isArray(info) ){ //este if consulta si es la ultima jugada porque en la ultima jugada el backend cambia la respuesta a un array de dos objetos [0]y[1] para mandar el resultado de la partida
        setOcultasServer([...ocultasServer, info[0].carta_server]);
        setUltimaCartaServ(cartasServerTotal.find(objeto => objeto.id === info[0].carta_server));
        if(info[0].resultado.ataque_server > info[0].resultado.ataque_user){
         setResultadoJugada('Gana el server :(');
        }else if(info[0].resultado.ataque_server < info[0].resultado.ataque_user){
          setResultadoJugada('Ganaste! :) ');
          } else{
              setResultadoJugada('Empate! :| ');
            }
        setResultadoJugada(prev=>prev + '  Esa fue la ultima jugada asi que el resultado de la partida es que el usuario ⇾ ' +info[1].el_usuario );
        setPlayAgainButton(true);
      }else{
        setOcultasServer([...ocultasServer, info.carta_server]);
        setUltimaCartaServ(cartasServerTotal.find(objeto => objeto.id === info.carta_server));
        if(info.resultado.ataque_server > info.resultado.ataque_user){
           setResultadoJugada('Gana el server :(');
        }else if(info.resultado.ataque_server < info.resultado.ataque_user){
          setResultadoJugada('Ganaste! :) ');
          } else{
              setResultadoJugada('Empate! :| ');
            }
      }

    }catch(err) {

      if (err.response && err.response.data) {
          setError(err.response.data);  // Caso error: setea el error que viene del backend
        } else {
          setError('Error desconocido');  // Por si no viene nada
        }
    }
  }

  return (
    <div className='PagJugar'> 
          {!estadofondo ? (
          <div className='opcionesLateral'>
            <table className='tablaCentrada'>
              <thead>
                <tr><th className='msjSeleccion'>Seleccione el mazo a jugar</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className='tdSeleccion'><select onChange={guardarSeleccion} defaultValue="" className='seleccion'>
                    <option value="" disabled > Selecciona un mazo </option>
                      {mazos.map((mazo, index) => (
                    <option key={index} value={mazo.id}>  {mazo.nombre}  </option>
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
          ):(
          <div className='tablero'>
            <div className="filaDeCartasServer">
              {cartasServer? 
                (
                  cartasServer.map( 
                    ([id, atributo])=> (
                      <div key={id} > 
                        {!ocultasServer.includes(Number(id)) && 
                          ( <div key={id}className="cartasServer "><p className='etiquetaServer'>Atributo</p>{atributo} </div> )
                        }
                      </div>
                    )
                  )
                )
                :
                (<></>)
              }
            </div>
            
            <div className="filaDeCartasUser">
              {cartas ? 
                (
                  cartas.map((carta) => (
                  <div key={carta.id} > 
                    {!botonesOcultos.includes(carta.id) && (
                      
                        <button onDoubleClick={ ()=> manejarJugada(carta.id)}  className="botonCartas" >
                          <div className="tituloCarta">{carta.nombre}</div>
                          <div><span className="etiquetaCarta">Atributo:</span> {carta.atributo_nombre}</div>
                          <div><span className="etiquetaCarta">Ataque:</span> {carta.ataque_nombre}</div>
                          <div><span className="etiquetaCarta">Poder de Ataque:</span> {carta.ataque}</div>
                        </button>
                      )
                    }                                   
                  </div> ))                          
                )
                : 
                (<></>)
              }
            </div>

          </div>
           )}
           {ocultasServer.length > 0 && (
            <div className='ultCartaServer'>
              <div className="tituloCarta">{ultimaCartaServ.nombre}</div>
              <div><span className="etiquetaCarta">Atributo:</span> <br />{(atributos[ultimaCartaServ.atributo_id])}</div>
              <div><span className="etiquetaCarta">Ataque:</span> <br /> {ultimaCartaServ.ataque_nombre}</div>
              <div><span className="etiquetaCarta">Poder de Ataque:</span> {ultimaCartaServ.ataque}</div>
            </div> 
            )}
           {botonesOcultos.length > 0 && (
            <div className='ultCartaUser'>
              <div className="tituloCarta">{ultimaCarta.nombre}</div>
              <div><span className="etiquetaCarta">Atributo:</span> <br /> {ultimaCarta.atributo_nombre}</div>
              <div><span className="etiquetaCarta">Ataque:</span> <br />{ultimaCarta.ataque_nombre}</div>
              <div><span className="etiquetaCarta">Poder de Ataque:</span> {ultimaCarta.ataque}</div>
            </div>
            )}
          <div>
            {error &&
              <p>Error {error}</p>
            }
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
         
      </div>
  )
}