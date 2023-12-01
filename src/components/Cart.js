import "../styles/layout/_cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    removeItem,
    clearCart,
    updateQuantity, syncCartWithFirebase
} from "../store/slices/CartSlice";


function Cart() {
    const dispatch = useDispatch();

    const allProducts = useSelector((state) => state.CartSlice.allProducts);

    const handleRemoveItem = (product) => {
        dispatch(removeItem(product));
        dispatch(syncCartWithFirebase(allProducts));

    };

    const handleClearAll = () => {
        dispatch(clearCart());
    };

    const totalProducts = allProducts.reduce(
        (total, product) => total + product.quantity,
        0
    );


    const handleUpdateQuantity = (product, newQuantity) => {
        dispatch(updateQuantity({ product, quantity: newQuantity }));
        dispatch(syncCartWithFirebase(allProducts));
    };

    const total = useSelector((state) => state.CartSlice.total.toFixed(2));



    return (
        <div className="fondo">
            <div className="cesta">
                {allProducts.length ? "CESTA" : "LA CESTA ESTA VACIA"}
                <span className="borrar" onClick={() => handleClearAll()}>
                    {allProducts.length
                        ? "Anular la selección de todos los articulos"
                        : null}
                </span>
                <hr className="hr1" />
                <div className="container">
                    <div className="row-product">
                        {allProducts.map((product) => (
                            <div className="cart_product" key={product.id}>
                                <img className="img" src={product.image} alt="imagen producto" />
                                <div className="info_product">
                                    <p className="titulo_product">{product.title}</p>

                                    <div className="cantidadprecio">
                                        <label>Cantidad:</label>
                                        <select
                                            id="opciones"
                                            value={product.quantity}
                                            onChange={(e) =>
                                                handleUpdateQuantity(product, parseInt(e.target.value))
                                            }>
                                            <option value="1">1 </option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
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
                                </div>

                                <span className="precio">$ {product.total}</span>
                            </div>
                        ))}
                    </div>
            </div>
            </div>
            <hr className="hr2" />
            <div className="subtotal">
                <div className="cart-total">
                    <h3 className="titulo">
                        {allProducts.length
                            ? `SUBTOTAL (${totalProducts} PRODUCTOS) : $${total} `
                            : null}{" "}
                    </h3>
                    <button className={allProducts.length ? 'boton' : 'hidden'} > Tramitar Pedido</button>
                    <div>
                        <Link to="/">
                            <button className="boton">volver a lista de productos</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
