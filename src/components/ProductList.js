import productList from '../data.json'
import '../styles/layout/_productlist.scss'


function ProductList({ Product }) {

    const renderProducts = () => {
        return productList.map((product, index) => (<Product key={index} product={product} />))
    }

    return (
        <section className='productlist'>
            {renderProducts()}
        </section>
    )
}

export default ProductList;