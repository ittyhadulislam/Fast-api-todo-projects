import { login, register } from "../../../apiRoutes/auth";
import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (body) => ({
        url: register,
        method: "POST",
        body,
      }),
    }),
    userLogin: builder.mutation({
      query: (body) => ({
        url: login,
        method: "POST",
        body
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
          const result = await queryFulfilled
          const {accessToken, userInfo} = result?.data
          // console.log(result?.data?.accessToken)
          sessionStorage.setItem("auth", JSON.stringify({accessToken, userInfo}))
          dispatch(userLoggedIn({accessToken, userInfo}))
        } catch (error) {
          console.log(error)
        }
      }
    })
  }),
});

export const { useUserRegistrationMutation, useUserLoginMutation } = authApi;
