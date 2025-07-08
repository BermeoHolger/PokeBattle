
import '../styles/NotiToast.css';
import { useEffect, useState } from 'react';
const NotiToast = ({mensaje,tipo}) => {
const [mostrarNoti, setMostrarNoti] = useState(true);

useEffect(()=>{
    setMostrarNoti(true);
    setTimeout(() => setMostrarNoti(false), 3000); 
},[mensaje]);
    return (
        <div>
        {mostrarNoti?(
            <div className='toast-container'>
                <div className={tipo==="exito" ? "toast": "toast-error"}>
                    <p className='texto-notificacion'>{mensaje}</p>
                </div>

            </div>)
        :(<></>)
        }
        </div>
    );
};
export default NotiToast;