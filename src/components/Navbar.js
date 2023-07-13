import '../styles/layout/_navbar.scss'
//import logo from '../styles/assets/menu.png'
import cart from '../styles/assets/cart.png'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <section className='navbar'>
            <div className='navbar__logo' >
                {/*<img src={logo} style={{ width: '50px', height: '40px' }}></img>*/}
                <Link to="/"> <h1>SUMMERBALL</h1> </Link>
            </div>
            <ul className='navbar__list'>
                <li><p>Hello Guest</p></li>
                <li><Link to="login">login</Link></li>
                <li><Link to="signup">signup</Link></li>
                <li><Link to="my-cart"><img src={cart} style={{ width: '60px', height: '50px' }} alt='carrito de compras'></img></Link></li>
            </ul>
        </section >
    );
}

export default Navbar;