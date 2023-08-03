import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Hero from "./Hero";
import { useState, useEffect } from "react";
import data from "../data.json";

function App() {

  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  //getDataApi
  useEffect(() => {
    setProductList(data);
  }, []);

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
