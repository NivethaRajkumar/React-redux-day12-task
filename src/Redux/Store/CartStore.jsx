import { configureStore } from "@reduxjs/toolkit";
import CartSliceReducer from "../Slices/CartSlice";

export const CartStore = configureStore({ 
    reducer: {
        cartReducer: CartSliceReducer
    }
})