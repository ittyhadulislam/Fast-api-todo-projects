import { profileData } from "@/src/apiRoutes/auth";
import { apiSlice } from "../../api/apiSlice";

const profileApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: profileData,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserProfileQuery } = profileApi;
