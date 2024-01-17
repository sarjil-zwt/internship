import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

export const productSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        setProductsState: (state, action) => {
            state.products = action.payload
        },
        addProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        }
    },

});

export const {
    setProductsState, addProduct
} = productSlice.actions;

export default productSlice.reducer;