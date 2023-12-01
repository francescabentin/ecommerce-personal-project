import "../styles/layout/_productlist.scss";
import '../styles/layout/_product.scss'
import { Input } from 'antd';
import imagen from "../images/imagen1.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, syncCartWithFirebase } from "../store/slices/CartSlice";
import { Link } from 'react-router-dom';
import { useState } from "react";




function ProductList() {

    const { productList } = useSelector((state) => state.productsSlice);
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)

    }

    const dispatch = useDispatch();

    const handleAddItem = (product) => {
        dispatch(addItem(product))
        dispatch(syncCartWithFirebase())

    }




    const renderProducts = () => {
        const filteredProducts = productList.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        return filteredProducts.map((product) => (
            <div key={product.id} className="wrapper">
                <div className="product-img">
                    <img src={product.image || imagen} alt='product' />
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1 >{product.title.slice(0, 20)}</h1>
                        <h2 >{product.category}</h2>

                    </div>
                    <div className="product-price-btn">
                        <p>
                            <span>{product.price}</span>$
                        </p>
                        <button onClick={() => handleAddItem(product)} type="button">buy now</button>
                    </div>
                    <Link className="detalle" to={`/product-detail/${product.id}`}>details</Link>
                </div>

            </div>
        ));
    };     

    return (
        <>
            <h1 className="app__container__productlist__h1">
                Lo mas vendido , elije la categoria que desees
            </h1>
            <Input.Search onChange={handleSearch} value={search}
                className="inputSearch" placeholder='Buscar...' />

            <section
                className="app__container__productlist
                __list">
                {
                    renderProducts()}          
            </section>
        </>
    );
}


export default ProductList;

