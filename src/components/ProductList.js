import "../styles/layout/_productlist.scss";

function ProductList({ Product, allProducts, setAllProducts, countProducts, setCountProducts, setTotal, productList }) {

    const onAddProduct = (product) => {

        const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {
        // Si el producto ya existe en el carrito, actualiza su cantidad
        const products = allProducts.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCountProducts(countProducts + 1);
        setAllProducts(products);

    } else {
        // Si el producto no existe en el carrito, agrégalo con cantidad 1
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
                Cada SummerBall tiene su propia historia
            </h1>
            <section
                className="app__container__productlist
                __list">
                {renderProducts()}
            </section>
        </>
    );
}

export default ProductList;
