import '../styles/layout/_product.scss'
import image from '../styles/images/blue-ball.jpg'


function Product() {

    return (

        <div className="wrapper">
            <div className="product-img">
                <img src={image} height="420" width="327" alt=' product' />
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1>Summer Ball</h1>
                    <h2>by studio and friends</h2>
                    <p>
                        Harvest Vases are a reinterpretation
                        <br />
                        of peeled fruits and vegetables as
                        <br />
                        functional objects. The surfaces
                        <br />
                        appear to be sliced and pulled aside,
                        <br />
                        allowing room for growth.
                    </p>
                </div>
                <div className="product-price-btn">
                    <p>
                        <span>78</span>$
                    </p>
                    <button type="button">buy now</button>
                </div>
            </div>
        </div>

    );

};

export default Product;
