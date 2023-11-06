import "../styles/layout/_cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../store/slices/CartSlice";



function Cart() {

    const allProducts = useSelector((state) => state.CartSlice.allProducts);
    const total = useSelector((state) => state.CartSlice.total);

    const dispatch = useDispatch();


    const handleRemoveItem = (product) => {
        dispatch(removeItem(product));
    };

    const handleClearAll = () => {
        dispatch(clearCart());

    };

    const totalProducts = allProducts.reduce(
        (total, product) => total + product.quantity,
        0
    );



    return (


        <div
            className="container">
            <div className="row-product">
                {allProducts.map((product) => (
                    <div className="cart-product" key={product.id}>
                        <div className="info-cart-product">
                            <span className="cantidad-producto-carrito">
                                {product.quantity}
                            </span>
                            <p className="titulo-producto-carrito">{product.title}</p>
                            <span className="precio-producto-carrito">
                                $ {product.total}
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

            <div className="cart-total ">
                <h3> {allProducts.length ? totalProducts : null} </h3>
                <span className="total-pagar">{allProducts.length ? total : null}</span>
            </div>
            <button onClick={() => handleClearAll()} className="btn-clearall">
                {allProducts.length ? " Vaciar Carrito" : null}
            </button>
            <Link to="/">
                <button className="btn-clearall">
                    volver a lista de productos
                </button>
            </Link>

        </div>


    );
}

export default Cart;
