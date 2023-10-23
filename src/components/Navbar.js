import "../styles/layout/_navbar.scss";
//import logo from '../styles/assets/menu.png'
import cart from "../images/cart.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ allProducts, total, countProducts, setAllProducts, setCountProducts, setTotal }) {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [active, setActive] = useState(false);

    const handleClickEvent = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleClickItem = () => {
        setMenuVisible(false);
    };

    const handleClickActive = () => {
        setActive(!active);
    }

    const handleDeleteAll = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    }

    const OnDeleteProduct = (product) => {
        const results = allProducts.filter(item => item.id !== product.id);


        setTotal(total - product.precio * product.quantity)
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    }


    return (
        <section className="sectionNavbar">
            <div className="navbar">
            <div className="navbar__logo">
                {/*<img src={logo} style={{ width: '50px', height: '40px' }}></img>*/}
                <Link to="/">
                    {" "}
                        <h1>RedVelvetBoutique</h1>{" "}
                </Link>
            </div>
            <ul className={`navbar__list ${isMenuVisible ? "show" : ""}`}>
                <li>
                    <p>Hello Guest</p>
                </li>
                <li>
                    <Link onClick={handleClickItem} to="login">
                        login
                    </Link>
                </li>
                <li>
                    <Link onClick={handleClickItem} to="signup">
                        signup
                    </Link>
                </li>
                <li>
                    <div onClick={handleClickActive} className="navbar__list__cart">
                        <img
                            src={cart}
                            style={{ width: "60px", height: "50px" }}
                            alt="carrito de compras"></img>
                        <span className="navbar__list__cart__span">{countProducts}</span>
                    </div>
                </li>
            </ul>
            <span onClick={handleClickEvent} className="menuhidden">
                menu
            </span>

            <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>

                {allProducts.length ? (
                    <>
                        <div className="row-product">
                            {allProducts.map(product =>
                            (
                                <div className="cart-product" key={product.id}>
                                    <div className="info-cart-product">
                                        <span className="cantidad-producto-carrito">{product.quantity}</span>
                                        <p className="titulo-producto-carrito">{product.titulo}</p>
                                        <span className="precio-producto-carrito">$ {product.precio}</span>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="icon-close"
                                        onClick={() => OnDeleteProduct(product)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            ))}

                        </div>
                        <div className="cart-total ">
                            <h3>Total:</h3>
                            <span className="total-pagar">{total}</span>
                        </div>
                        <button onClick={handleDeleteAll} className="btn-clearall">Vaciar Carrito</button>
                    </>
                ) : (
                    <p className="cart-empty">El carrito está vacío</p>
                )
                }


            </div>
            </div>
        </section>
    );
}

export default Navbar;
