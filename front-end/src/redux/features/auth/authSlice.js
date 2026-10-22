// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   token: null,
//   user: null,
// };
// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userLoggedIn: (state, action) => {
//       state.token = action.payload.accessToken;
//       state.user = action.payload.userInfo;
//     },
//     userLoggedOut: (state) => {
//       ((state.token = null), (state.user = null));
//     },
//   },
// });

// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
// export default authSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const auth = JSON.parse(sessionStorage.getItem("auth") || "null");

    return {
      token: auth?.accessToken ?? null,
      user: auth?.userInfo ?? null,
    };
  } catch {
    return {
      token: null,
      user: null,
    };
  }
};

const initialState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.userInfo;
    },
    userLoggedOut: (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
