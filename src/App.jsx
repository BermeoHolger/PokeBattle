import { useState,useEffect } from 'react'
import AppRoutes from './routes/AppRoutes.jsx';
import FooterComponent  from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx'
import {NavBarComponent} from './components/NavBarComponent.jsx';
import { jwtDecode } from 'jwt-decode';
import "./index.css";


const App = () => {    
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('Token'));

  useEffect(() => { 
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
  }, 5000); 

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

