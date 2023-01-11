import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    showAddTransactionModal: false,
    showAddPaymentsMethodModal: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openAddTransactionModal: (state) => {
            state.showAddTransactionModal = true;
        },
        openAddPaymentsMethodModal: (state) => {
            state.showAddPaymentsMethodModal = true;
        },
        closeModal: (state) => {
            state.showAddTransactionModal = false;
            state.showAddPaymentsMethodModal = false;
        }
    }
});

export const {openAddTransactionModal, openAddPaymentsMethodModal, closeModal} = modalSlice.actions
export default modalSlice.reducer;