import '../styles/NotiToast.css';
import { useEffect, useState } from 'react';
const NotiToast = ({mensaje,tipo}) => {
const [mostrarNoti, setMostrarNoti] = useState(true);

useEffect(()=>{
    setMostrarNoti(true);
},[mensaje]);
    return (
        <div>
        {mostrarNoti?(             
            <div className='toast-container'>
                <div className={tipo==="exito" ? "toast": "toast-error"}>
                    <button className='cerrar-noti' onClick={()=> setMostrarNoti(false)} > x </button>
                    <p className='texto-notificacion'>{mensaje}</p>                    
                </div>
                
            </div>)
        :(<></>)
        }    
        </div>          
    );
};
export default NotiToast;