import "../styles/layout/_cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, loadLocalStorage } from "../store/slices/CartSlice";
import { useEffect } from 'react'
import { Checkbox } from "antd";


function Cart() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadLocalStorage())
    }, [dispatch])


    const allProducts = useSelector((state) => state.CartSlice.allProducts);

    const total = useSelector((state) => state.CartSlice.total);


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

        <div className="fondo">
        <div
            className="container">
            <div className="row-product">
                {allProducts.map((product) => (
                    <div className="cart_product" key={product.id}>
                        <Checkbox />
                        <img className="img" src={product.image} alt="imagen producto" />
                        <div className="info_product">
                            <p className="titulo_product">{product.title}</p>
                            <span className="cantidad_product">
                                {product.quantity}
                            </span>
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
                        <span className="precio">
                            $ {product.total}
                        </span>
                    </div>
                ))}
            </div>

                <div className="cart_total">
                <h3> {allProducts.length ? totalProducts : null} </h3>
                    <span className="total_pagar">{allProducts.length ? total : null}</span>
            </div>
                <button onClick={() => handleClearAll()} className="btn_clearall">
                {allProducts.length ? " Vaciar Carrito" : null}
            </button>
            <Link to="/">
                    <button className="btn_clearall">
                    volver a lista de productos
                </button>
                </Link>
            </div>
        </div>

    );



}

export default Cart;


