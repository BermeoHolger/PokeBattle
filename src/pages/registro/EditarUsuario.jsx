import { editarusuario } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/editarUsuario.css'
import { jwtDecode } from 'jwt-decode';
import NotiToast from "../../components/NotiToast";


export const EditarUsuario = () => {
  const [Nombre, setNombre] = useState('');
  const [Password, setPassword] = useState('');
  const [PassConfirm, setPassConfirm] = useState('');
  const[datosback,setDatosBack] = useState("");
  const [errores, setErrores] = useState({
    nombre: [],
    password: [],
    passConfirm: [],
  });
  const token = sessionStorage.getItem('Token');

  const navigate = useNavigate();
  useEffect (() => {
    if(!token){
      navigate("/login");
    }
  }, [token,navigate]);

  const validarNombre = (nombre) => {
    const errores = [];
    if (nombre.trim().length === 0) {
      errores.push("El nombre no puede estar vacío.");
    } else if (nombre.length > 30) {
      errores.push("El nombre no puede tener más de 30 caracteres.");
    }
    return errores;
  };

  const validarPassword = (password) => {
    const errores = [];
    if (password.length < 8) {
      errores.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
      errores.push("Debe tener al menos una mayúscula.");
    }
    if (!/[a-z]/.test(password)) {
      errores.push("Debe tener al menos una minúscula.");
    }
    if (!/[0-9]/.test(password)) {
      errores.push("Debe tener al menos un número.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errores.push("Debe tener al menos un caracter especial.");
    }
    return errores;
  };

  const validarPassConfirm = (pass) => {
    const errores = [];
    if(pass != Password){
      errores.push("La Password debe ser igual")
    }
    return errores;
  }

  const handleChangeNombre = (e) => {
    const valor = e.target.value;
    setNombre(valor);
    setErrores(prev => ({ ...prev, nombre: validarNombre(valor) }));
  };

  const handleChangePassword = (e) => {
    const valor = e.target.value;
    setPassword(valor);
    setErrores(prev => ({ ...prev, password: validarPassword(valor) }));
  };

  const handleChangePassConfirm = (e) => {
    const valor = e.target.value;
    setPassConfirm(valor);
    setErrores(prev => ({ ...prev, passConfirm: validarPassConfirm(valor) }));
  };


  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: validarNombre(Nombre),
      password: validarPassword(Password),
      passConfirm: validarPassConfirm(PassConfirm)
    };
    setErrores(nuevosErrores);
    return (
      nuevosErrores.nombre.length === 0 &&
      nuevosErrores.password.length === 0 &&
      nuevosErrores.passConfirm.length === 0
    );
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validarFormulario()) return;
      let datos = jwtDecode(token);
      const id_user = datos.usuario;
      const nuevosDatos = {nombre: Nombre, password: Password};
      
      try {
        const response = await editarusuario(nuevosDatos, id_user);
        setDatosBack(response.data);
        if(response.status){
          setNombre("");
          setPassword("");
          setPassConfirm("");
        }
          
      } catch (err) {
        if (err.response && err.response.data) {
          setDatosBack(err.response.data);
        } else {
          setDatosBack({ error: 'Error desconocido' });
        }
      }
    };


  return (
      <div>
        <div className="totalForms">
          <form onSubmit={handleSubmit} className="forma">  
            <div className="barra">
              <p>Nuevo Nombre:</p>
              <input type="text" value={Nombre} onChange={handleChangeNombre} maxLength={30} required />
              <div className="msj-condiciones">
                {errores.nombre.map((e, index) => (
                  <p key={index} className="mensaje-error">{e}</p>
                ))}
              </div>
            </div>

            <div className="barra">
              <p>Nueva Password:</p>
              <input type="password" value={Password} onChange={handleChangePassword} required />
              <div className="msj-condiciones">
                {errores.password.map((e, index) => (
                  <p key={index} className="mensaje-error">{e}</p>
                ))}
              </div>
            </div>

          <div className="barraBoton">
            <div className="barra">
              <p>Confirmar nueva Password:  </p>
              <input type="password" value={PassConfirm} onChange={handleChangePassConfirm} required />
              <div className="msj-condiciones">
                {errores.passConfirm.map((e, index) => (
                  <p key={index} className="mensaje-error">{e}</p>
                ))}
              </div>
            </div>
        
            <button type="submit" className="botonEnviarForm">Actualizar</button>
            </div>
          </form>  
        </div>        
        {datosback?.estado && 
        <NotiToast mensaje={datosback.estado} tipo="exito"/>
        }
        {datosback?.error && 
        <NotiToast mensaje={datosback.error} tipo="error"/>
        }        
      </div>
  )
}
