import { GET_PRODUCTOS, GET_DETALLE_PRODUCTO, GET_CATEGORIA, SET_CATEGORIA } from './types'
import { getProductos, getDetalleProducto, getCategoria } from './api'

export const getProductosAction = productos => {
    return {
        type: GET_PRODUCTOS,
        productos
    }
}

export const getDetalleProductoAction = producto => {
    return {
        type: GET_DETALLE_PRODUCTO,
        producto
    }
}

export const getCategoriaAction = categoria => {
    return {
        type: GET_CATEGORIA,
        categoria
    }
}

export const setCategoriaAction = categoria => {
    return {
        type: SET_CATEGORIA,
        categoria
    }
}

export const getListaProductos = (texto) => dispatch => {
    getProductos(texto).then(({ data: result }) => dispatch(getProductosAction(result)))
}

export const getProducto = id => dispatch => {
    getDetalleProducto(id).then(({ data: item }) => dispatch(getDetalleProductoAction(item)))
}

export const getBreadcrumb = id => dispatch => {
    getCategoria(id).then(({ data: categories }) => dispatch(getCategoriaAction(categories)))
}

export const setBreadcrumb = lista => dispatch => {
    dispatch(setCategoriaAction(lista));
}

