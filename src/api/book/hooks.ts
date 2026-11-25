import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {getBooks} from "./index";
import type {BookSearchParams} from "./types";

export const useBooks = (params: BookSearchParams) => {
    return useQuery({
        queryKey: ["books", params],
        queryFn: ({ signal }) => getBooks(params, signal),
        enabled: params.query.trim().length > 0,
        placeholderData: params.page !== 1
            ? keepPreviousData
            : undefined
    });
};