import { SUBMISSION_URL } from "../../constants";
import type { SubmissionResponse } from "../../types/submission.types";
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
    getStudentSubmissions: builder.query<SubmissionResponse, void>({
      query: () => ({
        url: `${SUBMISSION_URL}/my`,
      }),
    }),

    getTeacherSubmissions: builder.query<SubmissionResponse, void>({
      query: () => ({
        url: `${SUBMISSION_URL}/teacher`,
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
    getTeacherIndividualSubmissions: builder.query({
      query: (assignmentId) => ({
        url: `${SUBMISSION_URL}/assignment/${assignmentId}`,
      }),
      providesTags: ["Submission"],
    }),
    gradeStudentAssignment: builder.mutation({
      query: ({ submissionId, data }) => ({
        url: `${SUBMISSION_URL}/${submissionId}/grade`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Submission"],
    }),
  }),
});

export const {
  useSubmitAssignmentMutation,
  useGetStudentSubmissionsQuery,
  useGetTeacherSubmissionsQuery,
  useGetTeacherIndividualSubmissionsQuery,
  useGradeStudentAssignmentMutation,
} = submissionApiSlice;
