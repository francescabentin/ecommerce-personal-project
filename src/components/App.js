import { Route, Routes } from "react-router-dom";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Hero from "./Hero";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, setList } from '../store/slices/ProductsSlice';
import ProductDetail from "./ProductDetail";



function App() {


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSlice.productList);


  useEffect(() => {

    if (productList.length === 0) {
      dispatch(fetchProducts()).then((resultAction) => {
          dispatch(setList(resultAction.payload));

      });
    }
  }, [productList, dispatch]);



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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
