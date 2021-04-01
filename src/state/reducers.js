import { GET_PRODUCTOS, GET_DETALLE_PRODUCTO, GET_CATEGORIA, SET_CATEGORIA } from './types'

export const productosReducer = (state, action) => {
    switch (action.type) {
        case GET_PRODUCTOS:
            return {
                ...state,
                productos: action.productos
            }

        case GET_DETALLE_PRODUCTO:
            return {
                ...state,
                producto: action.producto
            }
        case GET_CATEGORIA:
            return {
                ...state,
                categoria: action.categoria
            }
        case SET_CATEGORIA:
            return {
                ...state,
                categoria: action.categoria
            }
        default:
            return state;
    }
}
