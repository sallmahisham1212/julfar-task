import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
    name: "features",
    initialState: {
        features: [],
        view: null,
        map:null
    },
    reducers: {
        addMap(state, action) {
            state.map = action.payload
        },
        addView(state, action) {
            state.view = action.payload
        },
        addFeature(state, action) {
            state.features.push(action.payload)
        },
        removeFeature(state, action) {
            console.log(state, action, 'remove')
        }
    }
})

export const featuresActions = featuresSlice.actions;
export default featuresSlice;