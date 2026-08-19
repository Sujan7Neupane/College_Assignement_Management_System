import { ASSIGNMENT_URL } from "../../constants";
import type {
  AssignmentResponse,
  IndvidualAssignment,
} from "../../types/assignment.types";
import apiSlice from "./apiSlice";

const assignmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query<AssignmentResponse, void>({
      query: () => ({
        url: `${ASSIGNMENT_URL}/all`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Assignment"],
    }),
    getTeachersAssignment: builder.query<AssignmentResponse, void>({
      query: () => ({
        url: `${ASSIGNMENT_URL}/teacher/assignment`,
      }),
      providesTags: ["Assignment"],
    }),
    getAssignmentById: builder.query<IndvidualAssignment, string>({
      query: (id) => ({
        url: `${ASSIGNMENT_URL}/${id}`,
      }),
      providesTags: ["Assignment"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `${ASSIGNMENT_URL}/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignment"],
    }),

    updateAssignment: builder.mutation({
      query: (data) => ({
        url: `${ASSIGNMENT_URL}/${data.id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Assignment"],
    }),
    addAssignment: builder.mutation({
      query: (formData) => ({
        url: `${ASSIGNMENT_URL}/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useDeleteAssignmentMutation,
  useGetTeachersAssignmentQuery,
  useUpdateAssignmentMutation,
  useAddAssignmentMutation,
} = assignmentApiSlice;
