import imagen from "../images/imagen1.jpg";

const getDataApi = () => {
    return fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => {
            const cleanData =
                data.map((eachObject) => {
                    return {
                        titulo: eachObject.title,
                        precio: eachObject.price,
                        descripcion: eachObject.description,
                        imagen: eachObject.image || imagen,
                        id: eachObject.id,
                        category: eachObject.category
                    }
                })  
            return cleanData;
        });
};
export default getDataApi;