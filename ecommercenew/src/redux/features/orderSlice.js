import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "ordersState",
  initialState,
  reducers: {
    setOrdersState: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrdersState } = orderSlice.actions;

export default orderSlice.reducer;
