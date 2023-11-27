import admin from 'firebase-admin';
import fetch from 'node-fetch';


import { readFile } from 'fs/promises';

async function loadJsonFile(filePath) {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

// Uso
const serviceAccount = await loadJsonFile('./clave.json');
// Inicializa la aplicación de administración de Firebase con la clave privada
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://login-d0dcd-default-rtdb.firebaseio.com' // Reemplaza con tu URL de Firestore
});

const firestore = admin.firestore();

async function migrateData() {
    try {
        // Realiza una solicitud a tu API para obtener los productos
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Itera sobre los productos y guárdalos en Firestore
        for (const product of products) {
            await firestore.collection('productos').add(product);
        }

        console.log('Datos migrados correctamente.');
    } catch (error) {
        console.error('Error en la migración:', error);
    } finally {
        // Cierra la aplicación de administración de Firebase
        admin.app().delete();
    }
}

// Ejecuta la función de migración
migrateData();
