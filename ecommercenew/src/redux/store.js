import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import productSlice from './features/productSlice'

export const store = configureStore({
    reducer: {
        userState: userSlice,
        cartState: cartSlice,
        productState: productSlice
    },
})