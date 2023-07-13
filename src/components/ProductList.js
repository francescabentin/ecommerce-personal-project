import productList from '../data.json'
import '../styles/layout/_productlist.scss'


function ProductList({ Product }) {

    const renderProducts = () => {
        return productList.map((product, index) => (<Product key={index} product={product} />))
    }

    return (
        <>
            <h1 className='app__container__productlist__h1'>Cada SummerBall tiene su propia historia
            </h1>
            <section className='app__container__productlist
            __list'>
            {renderProducts()}
            </section>
        </>
    )
}

export default ProductList;