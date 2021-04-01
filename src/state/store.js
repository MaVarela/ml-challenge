import { createStore, applyMiddleware } from 'redux'

import { productosReducer } from './reducers'
import thunk from 'redux-thunk'

export const store = createStore(
    productosReducer,
    {
        productos: [],
        producto: null,
        categorias: null
    },
    applyMiddleware(thunk)
)