
import imagen from "../images/imagen1.jpg";



function Product({ product }) {


    return (

        <div key={product.id} className="wrapper">
            <div className="product-img">
                <img src={product.imagen || imagen} alt='product' />
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1 >{product.titulo}</h1>
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
