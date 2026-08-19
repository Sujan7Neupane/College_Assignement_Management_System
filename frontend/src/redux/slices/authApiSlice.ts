import { AUTH_URL } from "../../constants.ts";
import apiSlice from "./apiSlice.ts";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),

    editProfile: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useEditProfileMutation } =
  userApiSlice;
