import { configureStore } from "@reduxjs/toolkit";
import featuresSlice from "./featuresSlice";

const store = configureStore({
    reducer: {
        features: featuresSlice.reducer
    },
    middleware:  (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }), 
})

export default store;