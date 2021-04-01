import axios from 'axios'

const URL = 'http://localhost:3001/api';

export const getProductos = (texto) => {
    return axios(URL + "/items?search=" + texto);
}

export const getDetalleProducto = id => {
    return axios(URL + '/items/' + id);
}

export const getCategoria = id => {
    return axios(URL + '/category/' + id);
}
