import { recuperarMazos, getCartasMazo, eliminarMazo, editarMazo } from "../services/MisMazosServices";
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import '../styles/misMazos.css'
import NotiToast from "../components/NotiToast";

export const MisMazos = () => {
  let navigate = useNavigate();
  
  const token = sessionStorage.getItem('Token');
  const [error, setError] = useState (null);
  const [editarM, setEditarM] = useState(null); 
  const [mensajeEdicion, setMensajeEdicion] = useState(null);
  const [formData, setFormData] = useState({nombre: ''});
  const [mensajeErrorEliminacion, setMensajeErrorEliminacion] = useState(null);
  const [mensajeMazoEliminado, setMensajeMazoEliminado] = useState(null);
  const [mazos, setMazos] = useState([]);
  const atributos = {1: 'Fuego',2: 'Agua',3: 'Tierra',4: 'Normal',5: 'Volador',6: 'Piedra',7: 'Planta'};

  const traerMazos = async () => {
      try {
        let datos = null;
        let id_user = null;
        if (token) {
          datos = jwtDecode(token);
        }
        if (datos) {
          id_user = datos.usuario;
        }

        const response = await recuperarMazos(id_user);
        if (response.status === 200){
          setMazos(response.data)
        }
      } catch (err) {
        setError(err.response.data.error);
        setTimeout(() => setError(null), 3000);
      }
    };
  
  useEffect(() => {
    traerMazos(); 
  }, []);

  const [mazoVisible, setMazoVisible] = useState(null); 
  const [cartas, setCartas] = useState([]);
  
  const mostrarCartas = async (index, mazo_id) => {
    try {
      const response = await getCartasMazo(mazo_id);
      setMazoVisible(mazoVisible === index ? null : index); 
      
      if (response.status === 200){
        setCartas(response.data); 
        
      }else{
        setCartas ([]);
      }
    }
    catch(err){
      setError("Error al cargar las cartas del mazo");
      setTimeout(() => setError(null), 3000)

      console.error (error);
    }
  }
  
  const eliminarMazoHandler = async (id_mazo) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro que querés eliminar el Mazo?");
      if (!confirmacion) return; 
      const response = await eliminarMazo(id_mazo);

      if (response.status === 200) {
        const msjEliminado = response; 
        setMensajeMazoEliminado(msjEliminado.data.status);
        setTimeout(() => setMensajeMazoEliminado(null), 3000);
        setMazos(prevMazos => prevMazos.filter(mazo => mazo.id !== id_mazo));
      }
      
    } catch (error) {

      if (error.response && error.response.data && error.response.data.error) {
        setMensajeErrorEliminacion(error.response.data.error);
      } else {
        console.log("Error desconocido");
        setMensajeErrorEliminacion("No se pudo eliminar el mazo.");
      }
      setTimeout(() => setMensajeErrorEliminacion(null), 3000)
      setError(error.response.data.error);
      setTimeout(() => setError(null), 3000)
    };
  }

  const editarMazoHandler  = (id_mazo, nombre_mazo) => {
    
    setFormData( {"nombre":nombre_mazo} );
    setEditarM (id_mazo)
  }
  
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      const response = await editarMazo(editarM, { nombre: formData.nombre }); 
      
      const msjEdicion = response.data?.msj;
      setMensajeEdicion(msjEdicion);
      setTimeout(() => setMensajeEdicion(null), 3000); 
      
      setEditarM(null); 
      if (response.status === 200) {
        await traerMazos();
      }

    } catch (err) {
      console.log (err);
      setError("Error al editar el nombre del mazo");
      setTimeout(() => setError(null), 3000)
      console.error (error);
    }
  }

  
  const jugarHandler = (id_mazo) => {
    sessionStorage.setItem('Mazo', id_mazo);
    navigate("/jugar");
  };

  return (
    <div className="mazosTotal">
      <h2 className = "titulo">Tus Mazos</h2>

      
      
        {error && <NotiToast mensaje = {error} tipo="error"/>}
        {mensajeErrorEliminacion && (
          <NotiToast mensaje = {mensajeErrorEliminacion} tipo="error" />
        )}
        {mensajeMazoEliminado && (
          <NotiToast mensaje = {mensajeMazoEliminado} tipo="exito" />
        )}
      
      {mazos.length === 0 ? ( 
        <div className="noHayMazos">
        <button className="botonCrear" onClick={() => {navigate("/alta");}}> Crear mazo </button>
        </div>

      ):( 
      <div>
       
        <div className="mazos"> 
          {mazos.map((mazoActual, index) => (  
            <div key={index}> 
              <div key={index}>
                <div className="opcionesMazo">
                  <h3 className="nombreMazo">{mazoActual.nombre} </h3> 
                  <button onClick={() => mostrarCartas(index, mazoActual.id)}>
                    {mazoVisible === index ? "Ocultar mazo" : "Ver mazo"}
                  </button>
                  <button className="botonEliminarMazo" onClick={() => eliminarMazoHandler(mazoActual.id)}>Eliminar mazo</button>
                  <button onClick={() => editarMazoHandler (mazoActual.id, mazoActual.nombre)}>Editar mazo</button>
                  <button className="botonJugar" onClick={() => jugarHandler(mazoActual.id)}>Jugar con este mazo!</button>
                  {editarM == mazoActual.id && (
                      <div >
                        <form onSubmit={handleSubmit}className="editar">
                          <p>Nuevo Nombre:</p>
                          <button className="botonCancelar" onClick={() => setEditarM (null)}>Cancelar edicion</button>
                          <input
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                            value={formData.nombre}
                            />
                            <input type="submit" value="Editar"/>
                          
                        </form>
                        <p>
                        {mensajeEdicion}
                        </p>
                      </div>
                    )}
                </div> 
              </div>
              
              {mazoVisible === index && 
              <div className="mazo">
                <table className="tablatotal">
                  <thead className="tabla">
                    <tr>
                      <th>Nombre</th>
                      <th>Ataque</th>
                      <th>Nombre de Ataque</th>
                      <th>Atributo</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {cartas.map((item) => (
                      <tr key={item.id}> 
                        <td>{item.nombre}</td>
                        <td>{item.ataque}</td>
                        <td>{item.ataque_nombre}</td>
                        <td>{atributos[item.atributo_id]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            </div>
          ))}
          {mazos.length < 3 && (
            <div className="mazosExtra">
              {mazos.length === 2 ? (
                <p>Todavía podés crear un mazo más</p>
              ) : (
                <p>Todavía podés crear 2 mazos más</p>
              )}
              <button className="botonCrear" onClick={() => { navigate("/alta"); }}>Crear mazo</button>
            </div>
          )}

        </div>
      </div>
      )}
    </div>
  )
}
