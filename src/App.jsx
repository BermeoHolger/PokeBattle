import { useState } from 'react'
import AppRoutes from './routes/AppRoutes.jsx';
import FooterComponent  from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx'
import {NavBarComponent} from './components/NavBarComponent.jsx';
import "./index.css";
import GetEstadisticas from './pages/GetEstadisticas.jsx';

const App = () => {    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <HeaderComponent/> 
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <NavBarComponent isLoggedIn={isLoggedIn}/>   
      </AppRoutes>        
      <FooterComponent/>
   </>
  )
}
export default App;

