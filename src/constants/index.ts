import axios from "axios";

export const BOOKS_MAX_HISTORY = 8;

export const MODAL_TRANSITION_TIMEOUT = 300;

export const ROUTES = {
    BOOKS:{
        LIST: "book-list",
        SAVED: "book-saved",
    }
};

export const HEADER_LIST= [
    {
        name: "도서 검색",
        path: "book-list",
    },
    {
        name: "내가 찜한 책",
        path: "book-saved",
    }
];

export const BOOKS_STORAGE_KEY = {
    HISTORY: "cdri-search-history",
    FAVORITE: "cdri-favorite-books",
};

export const API_ERROR_MSG = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
            return "요청 시간이 초과되었습니다.";
        }
        if (!error.response) {
            return "네트워크 연결 상태를 확인해 주세요.";
        }
        const status = error.response.status;
        switch (status) {
            case 400:
                return "잘못된 요청입니다.";
            case 401:
            case 403:
                return "API 인증에 실패했습니다.";
            case 404:
                return "요청한 정보를 찾을 수 없습니다.";
            case 429:
                return "API 요청 한도를 초과했습니다.";
            default:
                if (status >= 500) {
                    return "서버 오류가 발생했습니다.";
                }
        }
    }

    return "오류가 발생했습니다. 다시 시도해 주세요.";
};