import '../styles/layout/_navbar.scss'
//import logo from '../styles/assets/menu.png'
import cart from '../styles/assets/cart.png'

function Navbar() {
    return (
        <section className='navbar'>
            <div className='navbar__logo'>
                {/*<img src={logo} style={{ width: '50px', height: '40px' }}></img>*/}
                <h1>SUMMERBALL</h1>
            </div>
            <ul className='navbar__list'>
                <li><p>Hello Guest</p></li>
                <li><button>Sign in</button></li>
                <li><img src={cart} style={{ width: '60px', height: '50px' }} alt='carrito de compras'></img></li>
            </ul>
        </section >
    );
}

export default Navbar;