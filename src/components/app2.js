import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Hero from "./Hero";
import getDataApi from "../services/apiFetch";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../store/slices/productsSlice";

function App() {

    const dispatch = useDispatch();

    const productListData = useSelector((state) => state.ProductsSlice.productList);


    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    useEffect(() => {
        if (productListData.length === 0) {
            getDataApi().then((data) => {

                dispatch(productListData(data));
            });
        }
    }, [productListData, dispatch]);


    return (

        <div className="app">

            <Navbar
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />
            <div className="app__container">
                <Routes>
                    <Route path="/"
                        element={
                            <>
                                <Hero />
                                <ProductList
                                    allProducts={allProducts}
                                    setAllProducts={setAllProducts}
                                    total={total}
                                    setTotal={setTotal}
                                    countProducts={countProducts}
                                    setCountProducts={setCountProducts}
                                    Product={Product}
                                    productList={productList} />

                            </>}
                    ></Route>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

        </div>

    );
}

export default App;


CARRITO EN NAVBAR
    < div
className = {`container-cart-products ${isCartActive ? "" : "hidden-cart"
    }`}>
    {
        "allProducts.length"?(
        <>
            <div className="row-product">
                {allProducts.map((product) => (
                    <div className="cart-product" key={product.id}>
                        <div className="info-cart-product">
                            <span className="cantidad-producto-carrito">
                                {product.quantity}
                            </span>
                            <p className="titulo-producto-carrito">
                                {product.titulo}
                            </p>
                            <span className="precio-producto-carrito">
                                $ {product.precio}
                            </span>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="icon-close"
                            onClick="{() => OnDeleteProduct(/*product*/)}">
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
                <span className="total-pagar">{/*total*/}</span>
            </div>
            <button /*handledeleteall*/ className="btn-clearall">
                Vaciar Carrito
            </button>
        </>
    ) : (
    <p className="cart-empty">El carrito está vacío</p>
)}
</div >