import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ModalStateItem} from "@/common/components/Modal/types";

interface ModalState {
    modals: ModalStateItem[];
}

const initialState: ModalState = {
    modals: [],
};

const modalSlice = createSlice({
    name: "modal",

    initialState,

    reducers: {
        openModal: (
            state,
            action: PayloadAction<ModalStateItem>
        ) => {
            state.modals.push(action.payload);
        },

        closeModal: (state) => {
            state.modals.pop();
        },

        closeModalById: (
            state,
            action: PayloadAction<string>
        ) => {
            state.modals = state.modals.filter(
                (modal) => modal.id !== action.payload
            );
        },

        closeAllModal: (state) => {
            state.modals = [];
        },
    },
});

export const {
    openModal,
    closeModal,
    closeModalById,
    closeAllModal,
} = modalSlice.actions;

export default modalSlice.reducer;