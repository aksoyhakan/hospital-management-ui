import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
  id: number;
  name: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "login",
          method: "POST",
          body: credentials,
        }),
      }
    ),
  }),
});

export const { useLoginMutation } = authApi;
