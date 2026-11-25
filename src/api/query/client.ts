import {QueryClient, QueryCache, MutationCache} from "@tanstack/react-query";

export const createQueryClient = (
    onError: (error: unknown) => void
) => {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                if (query.state.data === undefined) {
                    onError(error);
                }
            },
        }),

        mutationCache: new MutationCache({
            onError,
        }),

        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
            },
            mutations: {
                retry: false,
            },
        },
    });
};