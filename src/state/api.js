import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export const getProductos = (texto) => {
  return axios(URL + "/items?search=" + texto);
};

export const getDetalleProducto = (id) => {
  return axios(URL + "/items/" + id);
};

export const getCategoria = (id) => {
  return axios(URL + "/category/" + id);
};
