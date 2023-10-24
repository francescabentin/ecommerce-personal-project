import "../styles/layout/_productlist.scss";
import { Input } from 'antd';




function ProductList({ Product, allProducts, setAllProducts, countProducts, setCountProducts, setTotal, productList }) {

    const onAddProduct = (product) => {

        const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {

        const products = allProducts.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCountProducts(countProducts + 1);
        setAllProducts(products);

    } else {

        setAllProducts([...allProducts, { ...product, quantity: 1 }]);
        setCountProducts(countProducts + 1);

    }
        const newTotal = allProducts.reduce((acc, item) => {
            return acc + item.precio * item.quantity;
        }, 0);

        setTotal(newTotal);

    };


    const renderProducts = () => {
        return productList.map((product, index) => (
            <Product key={index} product={product} onAddProduct={onAddProduct} />
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
                {renderProducts()}
            </section>
        </>
    );
}

export default ProductList;
