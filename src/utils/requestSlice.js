import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      return [];
    },
  },
});
export const { setRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
