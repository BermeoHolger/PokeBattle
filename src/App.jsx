import { useState } from 'react'
import AppRoutes from './routes/AppRoutes.jsx';
import FooterComponent  from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx'
import {NavBarComponent} from './components/NavBarComponent.jsx';
import "./index.css";


const App = () => {    
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('Token'));
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

