import { createSlice } from "@reduxjs/toolkit";

const authLocalStorage = localStorage.getItem("auth");
const initialState = {
  userInfo: authLocalStorage ? JSON.parse(authLocalStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("auth", JSON.stringify(state.userInfo));
    },

    removeCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setLoginCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
