import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

export const singleProductSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setSingleProductState: (state, action) => {
      state.product = action.payload;
    },
    addReview: (state, action) => {
      state.product.Reviews.push(action.payload);
      let rating = 0;
      state.product.Reviews.map((r) => {
        rating += r.rating;
      });
      rating /= state.product.Reviews.length;
      state.product.ratings = rating;
    },
  },
});

export const { setSingleProductState, addReview } = singleProductSlice.actions;

export default singleProductSlice.reducer;
