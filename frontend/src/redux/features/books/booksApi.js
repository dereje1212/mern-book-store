import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl.js';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books/`,
    credentials: 'include',

    prepareHeaders: (headers) => headers,

});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],

    endpoints: (builder) => ({

        // Fetch all books
        fetchAllBooks: builder.query({
            query: () => ``,
            providesTags: ['Books'],
        }),

        // Fetch a single book
        fetchBookById: builder.query({
            query: (id) => `${id}`,
            providesTags: ['Books'],
        }),

        addBook: builder.mutation({
    query: (formData) => ({
        url: `create-book`,
        method: "POST",
        body: formData, // ✔ FormData works here
    }),
    invalidatesTags: ["Books"],
}),


        // Update a book
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `edit/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Books'],
        }),

        // Delete a book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'],
        }),

    }),
});

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

export default booksApi;
