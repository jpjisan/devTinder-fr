import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    setConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return [];
    },
  },
});
export const { setConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
