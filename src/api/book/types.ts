
export type BookSort = "accuracy" | "latest";

export type BookSearchTarget = "title" | "publisher" | "person";

export interface BookSearchParams {
    query: string;
    sort?: BookSort;
    page?: number;
    size?: number;
    target?: BookSearchTarget;
}

export interface Book {
    title: string;
    contents: string;
    url: string;
    isbn: string;
    datetime: string;
    authors: string[];
    publisher: string;
    translators: string[];
    price: number;
    sale_price: number;
    thumbnail: string;
    status: string;
}

export interface BookSearchMeta {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
}

export interface BookSearchResponse {
    meta: BookSearchMeta;
    documents: Book[];
}

export interface DetailSearchData {
    query: string;
    target: BookSearchTarget;
}