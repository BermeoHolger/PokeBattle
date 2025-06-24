import { useState } from "react";
import { cartas } from "./../api/api";
import { altaMazo } from "./../api/api";
import '../assets/styles/AltaMazo.css';


export const AltaDeunMazo = () => {

  const [cartasElegidas, setcartasElegidas] = useState([]);

  const [Carta, setCarta] = useState({
    atributo: "",
    nombre: "",
  });

  const [error, setError] = useState(null);
  const [datosCartas, setDatosCartas] = useState(null);
  const [datos, setDatos] = useState(null);

  const handleChangeCarta = (e) => {
    const { name, value } = e.target;

    setCarta({ 
      ...Carta, 
      [name]: name === "atributo" 
        ? (value === "" ? "" : parseInt(value, 10))
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cartas(Carta); 
      setDatosCartas(response); 
      setError();
    } 
    catch (err) {
      setDatos();
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ error: 'Error desconocido' });
      }
    }
  }

    const handleRowClick = (filaData) =>{
      const yaExiste = cartasElegidas.some(
      (row) => row.id === filaData.id
      );

      if ((!yaExiste) && (cartasElegidas.length < 5)) {
        setcartasElegidas((prevRows) => [...prevRows, filaData]);
      }
      else{

      }
    };

    const eliminarCarta = (id) =>{
      setcartasElegidas((prevCartas) =>
      prevCartas.filter((carta) => carta.id !== id)
    );
    }

    const [Mazo, setMazo] = useState({
      nombre: "",
      id: [],
  });

    const handleSubmitMazo = async (e) => {
    e.preventDefault();
    setDatos();
    setError();
    try {
      if((cartasElegidas.length ==5) && (Mazo.nombre)){
        const idsDeCartasElegidas = cartasElegidas.map(carta => carta.id);
        setMazo(prevMazo => ({
          ...prevMazo, 
          id: idsDeCartasElegidas, 
        }));
        const response = await altaMazo(Mazo); 
        if(response.error){
          setError(response);
        }
        else{
          setDatos('Mazo Creado Correctamente'); 
        }
      }
      else if(cartasElegidas.length<5){
        setError({ error: 'Debes Enviar 5 Cartas' });
      }
      else  
        setError({error: 'El Mazo Debe Tener Nombre'})
    } 
    catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ error: 'Error desconocido' });
      }
    }
  }

  const handleChangeMazo = (e) => {
    const { name, value } = e.target;

    setMazo(prevMazo => ({
        ...prevMazo,
        nombre: value
      }));
  };
 


  return (
    <div className="total">
      <div className="form-mazo">
      <h2>Crea Un Mazo</h2>
      <form onSubmit={handleSubmitMazo} className="formaM">
        <label>Nombre:</label> 
        <input type="text" name="nombre" onChange={handleChangeMazo} value={Mazo.nombre} className="input"/>

        <input type="submit" value="Crear"/>
      </form>
    
      {cartasElegidas.length > 0 ? (
        <div>
          {cartasElegidas.map((carta) => (
            <div key={carta.id} className="cartaElegida">
              <div className="atributosCarta">
              <p>{carta.nombre}</p>
              <p>{carta.ataque}</p>
              </div>
              <button  className="boton-eliminar"  onClick={() => eliminarCarta(carta.id)}> Eliminar </button>
            </div> ))}

        </div>
      ): ( <></> )
    
      }
      </div>

      <div className="form-cartas">
      <h2>Elegi Tus 5 Cartas</h2>
      <form onSubmit={handleSubmit} className="formaC">
        <label>Nombre:</label> 
        <input type="text" name="nombre" className="input" onChange={handleChangeCarta} value={Carta.nombre} placeholder="opcional"/>
        
        <label>Atributo:</label> 
        <input type="number" name="atributo" className="input" onChange={handleChangeCarta} value={Carta.atributo} placeholder="opcional"/>

        <input type="submit" value="Buscar"/>
      </form>

      {datosCartas && 
          <div >
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
              {datosCartas.map((item) => (
                <tr key={item.id} className="fila" onClick={() => handleRowClick(item)}> 
                  <td>{item.nombre}</td>
                  <td>{item.ataque}</td>
                  <td>{item.ataque_nombre}</td>
                  <td>{item.atributo_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      }
      </div>
      <p className="mensajes">
        {error && <div>{JSON.stringify(error.error)}</div>}
        {datos && <div>{JSON.stringify(datos)}</div>}
      </p>
    </div>
  )
} 