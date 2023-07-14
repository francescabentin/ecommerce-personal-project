import '../styles/layout/_navbar.scss'
//import logo from '../styles/assets/menu.png'
import cart from '../assets/cart.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleClickEvent = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleClickItem = () => {
        setMenuVisible(false);
    } 

    return (
        <section className='navbar'>
            <div className='navbar__logo' >
                {/*<img src={logo} style={{ width: '50px', height: '40px' }}></img>*/}
                <Link to="/"> <h1>SUMMERBALL</h1> </Link>
            </div>
            <ul className={`navbar__list ${isMenuVisible ? 'show' : ''}`}>
                <li><p>Hello Guest</p></li>
                <li><Link onClick={handleClickItem} to="login">login</Link></li>
                <li><Link onClick={handleClickItem} to="signup">signup</Link></li>
                <li><Link onClick={handleClickItem} to="my-cart"><img src={cart} style={{ width: '60px', height: '50px' }} alt='carrito de compras'></img></Link></li>
            </ul>
            <span onClick={handleClickEvent} className='menuhidden'>menu</span>
        </section >
    );
}

export default Navbar;