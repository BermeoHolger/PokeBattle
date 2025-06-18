import { useState } from 'react'
import AppRoutes from './routes/AppRoutes.jsx';
import FooterComponent  from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx'
import {NavBarComponent} from './components/NavBarComponent.jsx';
import "./index.css";

const App = () => {    
  return (
    <>
      <HeaderComponent/>
      <NavBarComponent/>
      <AppRoutes/>            
      <FooterComponent/>
   </>
  )
}
export default App
