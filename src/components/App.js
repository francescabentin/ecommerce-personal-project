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
import { userLoggedIn } from '../store/slices/SignUpSlice';



function App() {


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSlice.productList); 
  const user = useSelector((state) => state.SignUpSlice.user);
  console.log(user)




  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts()).then((resultAction) => {
        dispatch(setList(resultAction.payload));
      });
    }
  }, [productList.length, dispatch]);


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
