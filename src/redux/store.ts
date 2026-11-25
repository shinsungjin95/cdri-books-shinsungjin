import {configureStore} from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import favoriteReducer from "./slice/favoriteSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        favorite: favoriteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;