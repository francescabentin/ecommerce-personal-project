import Product from './Product';
import '../styles/App.scss';
import Navbar from './Navbar';

import ProductList from './ProductList';

function App() {


  return (
    <div className="App">
      <Navbar />
      <ProductList Product={Product} />
    </div>
  );
}

export default App;
