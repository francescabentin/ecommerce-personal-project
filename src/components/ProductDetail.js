import '../styles/layout/_product.scss'
import { useSelector, useDispatch } from 'react-redux';
import imagen from "../images/imagen1.jpg";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { findProduct } from '../store/slices/ProductsSlice';



function ProductDetail() {
    const { productId } = useParams();
    const productIdNumber = parseInt(productId, 10);
    const product = useSelector((state) => state.productsSlice.product);
    console.log(product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findProduct({ productIdNumber }));
        console.log({ productIdNumber })
    }, [dispatch, productIdNumber]);




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
