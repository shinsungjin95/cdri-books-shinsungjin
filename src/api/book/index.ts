import instance from "@/api/axios/instance.ts";
import type {
    BookSearchParams,
    BookSearchResponse,
} from "./types";

export const getBooks = async (params: BookSearchParams, signal?: AbortSignal): Promise<BookSearchResponse> => {
    const { data } = await instance.get<BookSearchResponse>(
        "/v3/search/book",
        { params, signal }
    );
    return data;
};