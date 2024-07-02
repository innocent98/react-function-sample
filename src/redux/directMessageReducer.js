import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    changeMessageState: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },

    updateMessageState: (state, action) => {
      state.messages = state.messages.map((message) =>
        message.id === action.payload.id ? action.payload : message
      );
    },

    resetMessageState: (state, action) => {
      state.messages = [];
    },
  },
});

export const { changeMessageState, updateMessageState, resetMessageState } =
  messageSlice.actions;
export default messageSlice.reducer;
