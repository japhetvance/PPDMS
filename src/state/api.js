import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi ({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Eggs",
        "Dashboard",
        "Employee"
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
          }),
        getEggs: build.query({
            query: () => "eggs/eggs",
            providesTags: ["Eggs"],
          }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
          }),
        getDashboard: build.query({
            query: () => "report/employee",
            providesTags: ["Employee"],
          }),
    })  
})

export const { 
    useGetUserQuery,
    useGetEggsQuery,
    useGetDashboardQuery
} = api;