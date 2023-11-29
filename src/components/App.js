import { Route, Routes } from "react-router-dom";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Cart from "./Cart";
import Hero from "./Hero";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, setList } from '../store/slices/ProductsSlice';
import ProductDetail from "./ProductDetail";
import { userLoggedIn, userLoggedOut } from "../store/slices/SignUpSlice";




function App() {


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSlice.productList); 





  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts()).then((resultAction) => {
        dispatch(setList(resultAction.payload));
      });
    }
  }, [productList.length, dispatch]);


  /*
    useEffect(() => {
      const checkAuthToken = async () => {
        try {
          const authToken = localStorage.getItem('authToken');
  
          if (authToken) {
            // Verificar el token con Firebase
            const user = await verifyAuthToken();
  
            // Si la verificación es exitosa, despachar userLoggedIn con los datos del usuario
            dispatch(userLoggedIn(user));
          } else {
            // Si no hay token, despachar userLoggedOut
            dispatch(userLoggedOut());
          }
        } catch (error) {
          console.error('Error al verificar el token:', error);
          // Manejar el error como desees, por ejemplo, despachar userLoggedOut
          dispatch(userLoggedOut());
        }
      };
      

  checkAuthToken();
}, [dispatch]);

*/

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

    if (userFromLocalStorage) {

      dispatch(userLoggedIn(userFromLocalStorage));
    } 

  }, [dispatch]);




  return (

    <div className="app">

      <Navbar
      />
      <div className="app__container">
        <Routes>
          <Route path="/"
            element={
              <>
                <Hero />
                <ProductList
                />

              </>}
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
