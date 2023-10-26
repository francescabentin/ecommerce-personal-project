import "../styles/layout/_productlist.scss";
import '../styles/layout/_product.scss'
import { Input } from 'antd';
import imagen from "../images/imagen1.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from "../store/slices/CartSlice";




function ProductList() {

    const productList = useSelector((state) => state.productsSlice.entities);


    const dispatch = useDispatch();

    const handleAddItem = (product) => {
        dispatch(addItem(product))

    }

    console.log(productList)


    const renderProducts = () => {
        return productList.map((product) => (
            <div key={product.id} className="wrapper">
                <div className="product-img">
                    <img src={product.image || imagen} alt='product' />
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1 >{product.titulo}</h1>
                        <h2 >{product.category}</h2>
                        <p >
                            {product.description}
                        </p>
                    </div>
                    <div className="product-price-btn">
                        <p>
                            <span>{product.price}</span>$
                        </p>
                        <button onClick={() => handleAddItem(product)} type="button">buy now</button>
                    </div>
                </div>

            </div>
        ));
    };     

    return (
        <>
            <h1 className="app__container__productlist__h1">
                Lo mas vendido , elije la categoria que desees
            </h1>
            <Input.Search placeholder='Buscar...' />

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

