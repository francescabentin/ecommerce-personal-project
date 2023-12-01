import '../styles/layout/_product.scss'
import { useSelector, useDispatch } from 'react-redux';
import imagen from "../images/imagen1.jpg";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { findProduct } from '../store/slices/ProductsSlice';
import { addItem, syncCartWithFirebase } from "../store/slices/CartSlice";




function ProductDetail() {
    const { productId } = useParams();
    const productIdNumber = parseInt(productId, 10);
    const product = useSelector((state) => state.productsSlice.product);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findProduct({ productIdNumber }));

    }, [dispatch, productIdNumber]);

    const allProducts = useSelector((state) => state.productsSlice.allProducts);

    const handleAddItem = (product) => {
        dispatch(addItem(product))
        dispatch(syncCartWithFirebase(allProducts))

    }


    return (

        <section className='detail'>
            <div id={
                product.id
            } className="wrapper-detail" >
                <div className="product-img">
                    <img src={product.image || imagen} alt='product' />
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1 >{product.title}</h1>
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
                    <Link className='back' to="/">go back</Link>
                </div>

            </div >
        </section>

    );

};

export default ProductDetail;
