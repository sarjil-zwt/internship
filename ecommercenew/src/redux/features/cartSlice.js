import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    date: "",
    products: [],
    total: 0,
    discount: 0,
    shipping: 40
};

const getTotal = (products, discount, shipping) => {
    let total = 0;
    products.forEach((p) => {
        total += (p.product.price * p.quantity)
    })
    console.log(total)

    let discounted = (total / 100) * (100 - discount)
    console.log(discounted)
    discounted += shipping


    return (discounted)
}

export const cartStateSlice = createSlice({
    name: "cartState",
    initialState,
    reducers: {
        addToCart: (state, action) => {


            const productIndex = state.products.findIndex((p) => {
                return p.product.id === action.payload.product.id
            })

            if (productIndex >= 0) {
                state.products = [...state.products.slice(0, productIndex), { product: { ...action.payload.product }, quantity: state.products[productIndex].quantity + action.payload.quantity }, ...state.products.slice(productIndex + 1)]
            } else {
                state.products = [...state.products, { product: { ...action.payload.product }, quantity: action.payload.quantity }]
            }


            state.date = moment().format("D-MMM-YYYY")

            state.total = getTotal(state.products, state.discount, state.shipping)
        },
        removeFromCart: (state, action) => {
            const productIndex = state.products.findIndex((p) => {
                return p.product.id == action.payload.id
            })

            if (productIndex >= 0) {
                state.products = state.products.filter((p) => {
                    return p.product.id != action.payload.id
                })
            }
            state.date = moment().format("D-MMM-YYYY")

            state.total = getTotal(state.products, state.discount, state.shipping)

        },
        setQuantityOfCartProduct: (state, action) => {
            console.log(action.payload)
            const productIndex = state.products.findIndex((p) => {
                return p.product.id == action.payload.id
            })
            console.log(productIndex)

            if (productIndex >= 0) {
                state.products = [...state.products.slice(0, productIndex), { ...state.products[productIndex], quantity: action.payload.quantity }, ...state.products.slice(productIndex + 1)]
            }
            state.date = moment().format("D-MMM-YYYY")

            state.total = getTotal(state.products, state.discount, state.shipping)
        },
        setCartDiscount: (state, action) => {
            state.discount = action.payload.discount
            console.log(state.discount)
            state.total = getTotal(state.products, state.discount, state.shipping)
        },
        setShipping: (state, action) => {
            state.shipping = action.payload.shipping
            state.total = getTotal(state.products, state.discount, state.shipping)
        }
    },

});

export const {
    addToCart, removeFromCart, setQuantityOfCartProduct, setCartDiscount, setShipping
} = cartStateSlice.actions;

export default cartStateSlice.reducer;