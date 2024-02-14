import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "groupState",
  initialState,
  reducers: {
    setGroupsState: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroupsState } = groupSlice.actions;

export default groupSlice.reducer;
