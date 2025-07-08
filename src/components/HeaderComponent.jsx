import '../styles/header.css';
import logo from '../assets/images/logo.svg'

const HeaderComponent = () => {
    return (
        <header className="header">
            <a href="/">
                <img src={logo} alt="Logo" className="logo" />
            </a>  
            <a href="/" className="titulo">PokeBattle</a>
        </header>
    );
};

export default HeaderComponent;