import "../styles/layout/_navbar.scss";
import cart from "../images/cart.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    toggleMenu,
    CloseMenu,
    toggleActive,
} from "../store/slices/NavbarSlice";
import { removeItem, clearCart } from "../store/slices/CartSlice";
import { userLoggedOut } from "../store/slices/SignUpSlice";
import menu from "../images/icons8-menú-64.png";

function Navbar() {
    const isMenuVisible = useSelector((state) => state.NavbarSlice.isMenuVisible);
    const isCartActive = useSelector((state) => state.NavbarSlice.isCartActive);
    const allProducts = useSelector((state) => state.CartSlice.allProducts);

    const identification = useSelector(
        (state) => state.SignUpSlice.isAuthenticated
    );

    const user = useSelector((state) => state.SignUpSlice.user);
    console.log(user)

    const total = useSelector((state) => state.CartSlice.total.toFixed(2));

    const dispatch = useDispatch();

    const handleClickEvent = () => {
        dispatch(toggleMenu());
    };

    const handleClickItem = () => {
        dispatch(CloseMenu());
    };

    const handleCartEvent = () => {
        dispatch(toggleActive());
    };

    const handleCloseCart = () => {
        dispatch(toggleActive(!isCartActive));
        dispatch(CloseMenu());
    };

    const handleRemoveItem = (product) => {
        dispatch(removeItem(product));
    };

    const handleClearAll = () => {
        dispatch(clearCart());
        dispatch(CloseMenu());
        dispatch(toggleActive(false));
    };

    const totalProducts = allProducts.reduce(
        (total, product) => total + product.quantity,
        0
    );

    const handleLogs = () => {
        localStorage.removeItem("user");
        dispatch(userLoggedOut());
        console.log("logginOut");
    };

    return (
        <section className="sectionNavbar">
            <div className="navbar">
                <div className="navbar__logo">
                    { }
                    <Link to="/">
                        {" "}
                        <h1 onClick={handleClickItem}>RedVelvetBoutique</h1>{" "}
                    </Link>
                </div>
                <ul className={`navbar__list ${isMenuVisible ? "show" : ""}`}>
                    <li>
                        <p className="guest">
                            {identification
                                ? user && user.email
                                    ? `Hi ${user.email.split("@")[0]}!`
                                    : "Hi guest"
                                : "Hello Guest"}
                        </p>
                    </li>
                    <li className={user ? "hidden" : ""}>
                        <Link onClick={handleClickItem} to="/login">
                            LOGIN
                        </Link>
                    </li>
                    <li className={user ? "" : "hidden"}>
                        <Link onClick={handleLogs} to="#">
                            LOGOUT
                        </Link>
                    </li>

                    <li>
                        <Link onClick={handleClickItem} to="signup">
                            {user ? "" : "signup"}
                        </Link>
                    </li>
                    <li>
                        <div onClick={handleCartEvent} className="navbar__list__cart">
                            <img
                                src={cart}
                                style={{ width: "60px", height: "50px" }}
                                alt="carrito de compras"></img>
                            <span className="navbar__list__cart__span">{totalProducts}</span>
                        </div>
                    </li>
                </ul>
                <span onClick={handleClickEvent} className="menuhidden">
                    <img className="menu" src={menu} alt="menu"></img>
                </span>

                <div
                    className={`container-cart-products ${isCartActive ? "" : "hidden-cart"
                        }`}>
                    {allProducts.length ? (
                        <>
                            <div className="row-product">
                                {allProducts.map((product) => (
                                    <div className="cart-product" key={product.id}>
                                        <div className="info-cart-product">
                                            <span className="cantidad-producto-carrito">
                                                {product.quantity}
                                            </span>
                                            <p className="titulo-producto-carrito">
                                                {product.title.slice(0, 10)}
                                            </p>
                                            <span className="precio-producto-carrito">
                                                ${product.total.toFixed(2)}
                                            </span>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            onClick={() => handleRemoveItem(product)}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="icon-close">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total  ">
                                <h3 className="hidden">{totalProducts} </h3>
                                <span className="total-pagar">{`Total :  $ ${total}`}</span>
                            </div>
                            <button onClick={() => handleClearAll()} className="btn-clearall">
                                Vaciar Carrito
                            </button>
                            <Link to="/cart">
                                <button onClick={handleCloseCart} className="btn-clearall">
                                    Ir a la cesta
                                </button>
                            </Link>

                            <button onClick={handleCloseCart} className="btn-clearall">
                                Cerrar y seguir comprando
                            </button>
                        </>
                    ) : (
                        <p className="cart-empty">El carrito está vacío</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Navbar;
