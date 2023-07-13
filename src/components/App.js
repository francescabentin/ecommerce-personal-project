import { Route, Routes } from "react-router-dom";
import Product from "./Product";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Mycart from './MyCart'
import Hero from "./Hero";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app__container">
        <Routes>
          <Route exact path="/"
            element={
              <>
                <Hero />
                <ProductList Product={Product} />
              </>}
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="my-cart" element={<Mycart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
