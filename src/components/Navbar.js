import '../styles/layout/_navbar.scss'
import logo from '../styles/assets/menu.png'

function Navbar() {
    return (
        <navbar className='navbar'>
            <div className='navbar__logo'>
                <img src={logo} style={{ width: '60px', height: '50px' }}></img>
            </div>
            <ul className='navbar__list'>
                <li><p>Hello Guest</p></li>
                <li><button>Sign in</button></li>
                <li><img src={logo} style={{ width: '60px', height: '50px' }}></img></li>
            </ul>
        </navbar >
    );
}

export default Navbar;