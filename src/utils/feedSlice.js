import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray;
    },
  },
});

export const { setFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
