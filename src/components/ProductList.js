import productList from "../data.json";
import "../styles/layout/_productlist.scss";

function ProductList({ Product, allProducts, setAllProducts }) {

    const onAddProduct = (product) => {
        setAllProducts([...allProducts, product]);
        /*const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {
        // Si el producto ya existe en el carrito, actualiza su cantidad
        const products = allProducts.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setAllProducts(products);
    } else {
        // Si el producto no existe en el carrito, agrégalo con cantidad 1
        setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
};*/
    }

    console.log(allProducts);

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
