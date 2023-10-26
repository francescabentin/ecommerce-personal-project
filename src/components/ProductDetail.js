import '../styles/layout/_product.scss'
import { useSelector } from 'react-redux';
import imagen from "../images/imagen1.jpg";
import { useParams } from 'react-router-dom';
//import { useEffect, useCallback } from 'react';
//import { setSingleProduct } from '../store/slices/productsSlice';



function ProductDetail() {
    const { productId } = useParams();
    const { productList } = useSelector((state) => state.productsSlice)
    console.log(productList, productId);

    const selectedProduct = productList.find((item) => productId === item.id);
    let product;

    if (selectedProduct) {
        product = selectedProduct
    } else {
        console.log('error');

        product = {
            "id": 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": {
                "rate": 3.9,
                "count": 120
            }
        }
    }

    return (

        <section className='detail'>
            <div id={
                product.id
            } className="wrapper" >
                <div className="product-img">
                    <img src={product.image || imagen} alt='product' />
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1 >{product.title}</h1>
                        <h2 className='hidden'>{product.category}</h2>
                        <p className='hidden'>
                            {product.description}
                        </p>
                    </div>
                    <div className="product-price-btn">
                        <p>
                            <span>{product.price}</span>$
                        </p>
                        <button type="button">buy now</button>
                    </div>
                </div>

            </div >
        </section>

    );

};

export default ProductDetail;
