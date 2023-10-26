import axios from "axios";

const getDataApi = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        const cleanData = data.map((eachObject) => {
            return {
                titulo: eachObject.title,
                precio: eachObject.price,
                descripcion: eachObject.description,
                imagen: eachObject.image,
                id: eachObject.id,
                category: eachObject.category,
            };
        });
        return cleanData;
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error;
    }
};

export default getDataApi;
