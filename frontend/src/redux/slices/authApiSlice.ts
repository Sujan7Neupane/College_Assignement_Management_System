import { AUTH_URL } from "../../constants.ts";
import type {
  SingleUserResponse,
  UserResponse,
} from "../../types/user.types.ts";
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

    getAllUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: `${AUTH_URL}/users`,
      }),
      providesTags: ["User"],
    }),
    getUsersById: builder.query<SingleUserResponse, string>({
      query: (id) => ({
        url: `${AUTH_URL}/users/${id}`,
      }),
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `${AUTH_URL}/users/${id}/role`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    approveUser: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}/disable`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${AUTH_URL}/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/users/add`,
        method: "POST",
        body: data,
      }),
    }),
    adminProfileUpdate: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/admin/profile/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useEditProfileMutation,
  useGetAllUsersQuery,
  useGetUsersByIdQuery,
  useUpdateUserRoleMutation,
  useApproveUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useAdminProfileUpdateMutation,
} = userApiSlice;
