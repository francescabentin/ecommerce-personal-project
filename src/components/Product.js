import '../styles/layout/_product.scss'
import image from '../styles/assets/blue-ball.jpg'


function Product({ product }) {

    return (

        <div className="wrapper">
            <div className="product-img">
                <img src={image} height="420" width="327" alt=' product' />
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1 className='hidden'>{product.titulo}</h1>
                    <h2 className='hidden'>{product.subtitulo}</h2>
                    <p className='hidden'>
                        {product.descripcion}
                    </p>
                </div>
                <div className="product-price-btn">
                    <p>
                        <span>{product.precio}</span>$
                    </p>
                    <button type="button">buy now</button>
                </div>
            </div>
        </div>

    );

};

export default Product;
