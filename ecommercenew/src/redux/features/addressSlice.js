import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

export const addressSlice = createSlice({
  name: "addressState",
  initialState,
  reducers: {
    setAddressesState: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses = [...state.addresses, action.payload];
    },
    editAddress: (state, action) => {
      const newaddress = action.payload;
      const index = state.addresses.findIndex((a) => {
        return a.id === newaddress.id;
      });

      state.addresses = [
        ...state.addresses.slice(0, index),
        newaddress,
        ...state.addresses.slice(index + 1, state.addresses.length),
      ];
    },
    deleteAddress: (state, action) => {
      const index = state.addresses.findIndex((a) => {
        return a.id === action.payload;
      });

      state.addresses = [
        ...state.addresses.slice(0, index),
        ...state.addresses.slice(index + 1, state.addresses.length),
      ];
    },
  },
});

export const { setAddressesState, addAddress, editAddress, deleteAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
