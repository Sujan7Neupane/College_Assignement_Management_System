import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants.ts";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Assignment", "Submission"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
