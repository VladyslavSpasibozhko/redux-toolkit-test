import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5005',
  }),
  tagTypes: ['USERS', 'COMMENTS', 'POSTS'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return 'users';
      },
      providesTags: (result) => {
        return result.map((data) => ({ type: 'USERS', id: data.id }));
      },
    }),
    getUser: builder.query({
      query: (id) => {
        return `users/${id}`;
      },
      providesTags: (result) => {
        return [{ type: 'USERS', id: result.id }];
      },
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const action = api.util.updateQueryData('getUser', id, (draft) => {
          Object.assign(draft, patch);
        });

        const result = dispatch(action);
        queryFulfilled.catch(result.undo);
      },
      invalidatesTags: (result) => {
        return [{ type: 'USERS', id: result.id }];
      },
    }),
    getPosts: builder.query({
      query: (params) => ({
        url: 'posts',
        params,
      }),
    }),
    getComments: builder.query({
      query: (params) => ({
        url: 'comments',
        params,
      }),
      providesTags: () => {
        return [{ type: 'COMMENTS', id: 'LIST' }];
      },
    }),
    updateComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (res, err, { id }) => {
        return [
          { type: 'COMMENTS', id: 'LIST' },
          { type: 'COMMENTS', id: id },
        ];
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  reducer,
  middleware,
  reducerPath,
  usePrefetch,
} = api;
