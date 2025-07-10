
import '../styles/jugar.css'
import { useState,useEffect } from 'react'
import { comenzarPartida, eliminarPartida, recuperarMazos, obtenerAtributosCartas, mandarJugada, getCartasMazo } from '../services/JugarServices';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import NotiToast from '../components/NotiToast';

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
  const navigate = useNavigate();
  const atributos = {1: 'Fuego',2: 'Agua',3: 'Tierra',4: 'Normal',5: 'Volador',6: 'Piedra',7: 'Planta'};
  const [continarPartida, setContinuarPartida]=useState(false);
  const [dataEnCurso, setDataEnCurso]=useState({});
  const [token, setToken] = useState(sessionStorage.getItem("Token"));
  const [datos, setDatos] = useState();
  const [id_user, setId_User] = useState();
  
 
  
  useEffect (() => {
    const idMazo_Storage = sessionStorage.getItem("Mazo");
    if(!token){
      navigate("/login");
    }
    else{
      setDatos(jwtDecode(token));
    }
    if (token) {
      setId_User(jwtDecode(token).usuario);
    }
    const fetchDatos = async () => {
      try {
          const responseCartas = await getCartasMazo(1);
          if(responseCartas){
            setCartasServerTotal(responseCartas.data);
          }          
          const response = await recuperarMazos(jwtDecode(token).usuario,token);
          const mazosJsn = response.data;
          if (Array.isArray(mazosJsn)) {
            setMazos(mazosJsn);
          } else {          
            setMazos([]);
          }        
        } catch (err) {
          if (err.response && err.response.data) {
            setMazos(err.response.data); 
          } else {
            setMazos('Error desconocido'); 
          }
        }
    }
    
    if(idMazo_Storage){
      mostrarOcultar();
    }
    else{
      fetchDatos();
    }
    
  }, []);
  
  const manejarContinuarPartida= ()=>{
    setEstadoFondo(true);
    setError(null);
    setId_Partida(dataEnCurso['id']);
    setDatos(jwtDecode(token));
    setId_User(datos.usuario);    
    if(dataEnCurso['usuario_id'] === id_user){    
      setContinuarPartida(true);
      const aux= dataEnCurso['mazo_cartas'];
      if(Array.isArray(aux)){
      setCartas(aux);        
      }
      const aux2= dataEnCurso['mazo_cartas_server'];      
      const aux2_transformado = aux2.map(item=>[String(item.id), item.atributo])      
      if(Array.isArray(aux2_transformado)){
        setCartasServer(aux2_transformado);
      }            
    }        
  }

  const mostrarOcultar = async () => {
    setEstadoFondo(!estadofondo);
    const idMazo_Storage = sessionStorage.getItem("Mazo");
    let data=null;
    if(idMazo_Storage){
      data={id:Number(idMazo_Storage)};
      sessionStorage.removeItem('Mazo');
    }
    else{
      data={id:Number(mazoSeleccionado)}
    }
    try{
        const response = await comenzarPartida(data,token);               
        const aux = response.data.cartas;          
        setId_Partida(response.data.id_partida);
        if(Array.isArray(aux)){
            setCartas(aux);
        }else{
          setCartas([]);
        }        
        const response2 = await obtenerAtributosCartas(1,response.data.id_partida);         
        setCartasServer(Object.entries(response2.data));        
    } catch (err) {
       if (err.response && err.response.data) {                    
          setError(err.response.data);                    
          setDataEnCurso(err.response.data.data);          
        } else {
          setError('Error desconocido');  
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
      if(Array.isArray(info) ){
        setOcultasServer([...ocultasServer, info[0].carta_server]);
        setUltimaCartaServ(cartasServerTotal.find(objeto => objeto.id === info[0].carta_server));
        if(info[0].resultado.ataque_server > info[0].resultado.ataque_user){
         setResultadoJugada('Gana el server :(');
        }else if(info[0].resultado.ataque_server < info[0].resultado.ataque_user){
          setResultadoJugada('Ganaste! :) ');
          } else{
              setResultadoJugada('Empate! :| ');
            }
        setResultadoJugada(prev=>prev + '  Esa fue la ultima jugada! Asi que el resultado de la partida es: el usuario ⇾ ' +info[1].el_usuario );
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
          setError(err.response.data);  
        } else {
          setError('Error desconocido'); 
        }
    }
  }
  const eliminarPartidaEmpezada= async()=>{
    const partida = await eliminarPartida();
    window.location.reload();
  }

  return (
    mazos.error? (
      <div className='eliminarPartida'>
        <NotiToast mensaje={mazos.error} tipo="error"/>
      </div>
    ): (
      error? (
        dataEnCurso['usuario_id'] == id_user?
        (
          <div className='eliminarPartida'>
          <NotiToast mensaje={error.error} tipo="error"/>
          <button  className="boton-eliminarPartida"  onClick={eliminarPartidaEmpezada}> Eliminar Partida Empezada </button>
          {!continarPartida&& 
            <button className="boton-continuarPartida" onClick={manejarContinuarPartida} > Continuar Partida </button>
          }
          </div>
        )
        :
        (
          <div className='eliminarPartida'>
            <NotiToast mensaje={error.error} tipo="error"/>
            <p className='msj-Error'>La partida no te pertenece 😅 <br/> Espera a que el otro usuario termine su partida 🤠 </p>
          </div>
        )         
      ):(
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
                <div>
                  {!estadofondo&&( 
                    (mazoSeleccionado? 
                      (<button onClick={mostrarOcultar} className='botonIniciar'> Iniciar Partida </button>)
                      :
                      (<button disabled className='botonIniciarProhibido'> Iniciar Partida </button>)
                    )
                  )
                  }           
                </div>
              </div>
            ):(
              <div className='tablero'>
              
                <div className="filaDeCartasServer">
                  {cartasServer&&(                
                      cartasServer.map( 
                        ([id, atributo])=> (
                          <div key={id} > 
                            {!ocultasServer.includes(Number(id)) && 
                              ( <div key={id}className="cartasServer "><p className='etiquetaServer'>Atributo <br/> <br/> {atributo}</p></div> )
                            }
                          </div>
                        )
                      )
                  )             
                  }
                </div>
                
                <div className="filaDeCartasUser">              
                  {cartas &&  (              
                    cartas.map((carta) => (
                      <div key={carta.id} > 
                        {!botonesOcultos.includes(carta.id) && 
                          (
                            <button onDoubleClick={ ()=> manejarJugada(carta.id)}  className="botonCartas" >
                              <div className="tituloCarta">{carta.nombre}</div>
                              <div><span className="etiquetaCarta">Atributo:</span> {carta.atributo_nombre}</div>
                              <div><span className="etiquetaCarta">Ataque:</span> {carta.ataque_nombre}</div>
                              <div><span className="etiquetaCarta">Poder:</span> <br /> {carta.ataque}</div>
                            </button>
                          )
                        }                                   
                      </div> 
                    ))
                  )                          
                  }
                </div>

              </div>
            )
          }

          {ocultasServer.length > 0 && (
            <div className='ultCartaServer'>
              <button className='botonCartasJugadaServ'>
              <div className="tituloCarta">{ultimaCartaServ.nombre}</div>
              <div><span className="etiquetaCarta">Atributo:</span> <br />{(atributos[ultimaCartaServ.atributo_id])}</div>
              <div><span className="etiquetaCarta">Ataque:</span> <br /> {ultimaCartaServ.ataque_nombre}</div>
              <div><span className="etiquetaCarta">Poder:</span> <br />{ultimaCartaServ.ataque}</div>
              </button>
            </div> 
            )
          }

          {botonesOcultos.length > 0 && (
            <div className='ultCartaUser'>
              <button className='botonCartasJugada'>
              <div className="tituloCarta">{ultimaCarta.nombre}</div>
              <div><span className="etiquetaCarta">Atributo:</span> <br /> {ultimaCarta.atributo_nombre}</div>
              <div><span className="etiquetaCarta">Ataque:</span> <br />{ultimaCarta.ataque_nombre}</div>
              <div><span className="etiquetaCarta">Poder:</span> <br />{ultimaCarta.ataque}</div>
              </button>
            </div>
            )
          }

          <div>
            {mostrarResultado &&
            <p className='mensajeJugada'>{resultado_jugada}</p>
            }
          </div>

          <div>
            {PlayAgainButton&& (         
              <a href='/jugar'>
                <button className='botonPlayAgain'> ¿Jugar otra vez? </button>
              </a>              
              )
            }
          </div>
                   
        </div>
      )
    )
  )
}