import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseSplitApi = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        getUsers: builder.query<null, string>({
            query: () => "test",
        }),
    })
})

export const store = configureStore({
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(baseSplitApi.middleware),
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [baseSplitApi.reducerPath]: baseSplitApi.reducer,
    },
})