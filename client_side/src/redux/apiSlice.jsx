
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['User','Admin'],
  endpoints: (builder) => ({
    // Define your endpoints here
  }),   
});