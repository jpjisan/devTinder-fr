import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFeed } = feedSlice.actions;
export default feedSlice.reducer;
