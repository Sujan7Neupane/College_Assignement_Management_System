import { SUBMISSION_URL } from "../../constants";
import apiSlice from "./apiSlice";

const submissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitAssignment: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${SUBMISSION_URL}/submit/assignment/${id}`,
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const { useSubmitAssignmentMutation } = submissionApiSlice;
