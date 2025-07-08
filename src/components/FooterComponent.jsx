import logo from '../assets/images/logo.svg'
import '../styles/footer.css';

const FooterComponent = () => {
  return (
    <footer className="piedepag">
      <div className='nombres'>
          @Santiago Brea 
          --
          @Holger Bermeo
          --
          @Carlo Castro
      </div>
      <div className='ano'>
          Año - 2025
      </div>
    </footer>    
  );
};

export default FooterComponent;