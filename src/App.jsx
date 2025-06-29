import { useState } from 'react'
import AppRoutes from './routes/AppRoutes.jsx';
import FooterComponent  from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx'
import {NavBarComponent} from './components/NavBarComponent.jsx';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import "./index.css";


const App = () => {    
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('Token'));

  useEffect(() => { // Reviso cuando se vence el token
  const intervalo = setInterval(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      const ven = jwtDecode(token).vence;
      const venMs = new Date(ven).getTime();
      const ahora = Date.now();
      if (ahora > venMs) {
        sessionStorage.removeItem("Token");
        window.location.href = "/login";
      }
    }
  }, 5000); //checkeo cada 5 segundos

  return () => clearInterval(intervalo); 
  }, []);

  return (
    <>
      <HeaderComponent/> 
      <AppRoutes  setIsLoggedIn={setIsLoggedIn}>
        <NavBarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>   
      </AppRoutes>        
      <FooterComponent/>
   </>
  )
}
export default App;

