import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart slice',
    initialState: {
        "products": [],
    },
    reducers: {
        INCREMENT: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product.stock > (product.quantity || 1)) {
                product.quantity = (product.quantity || 1) + 1;

                //Calculating the actual price from discount percentage
                const actualPrice = ((product.quantity || 1) * product.price + (((product.quantity || 1) * product.price) * (product.discountPercentage / 100))).toFixed(2)
                product.actualPrice = actualPrice
            }
            else {
                product.isOutOfStock = true;
            }
        },
        DECREMENT: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product && product.quantity > 0) {
                product.isOutOfStock = false;
                product.quantity -= 1;

                //Calculating the actual price from discount percentage
                const actualPrice = ((product.quantity || 1) * product.price + (((product.quantity || 1) * product.price) * (product.discountPercentage / 100))).toFixed(2)
                product.actualPrice = actualPrice;

            }
        },
        REMOVE: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id);
            if (product) {
                state.products = state.products.filter(p => product.id !== p.id)
            }
        },
        ADD_PRODUCTS: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { INCREMENT, DECREMENT, REMOVE, ADD_PRODUCTS } = CartSlice.actions
export default CartSlice.reducer