import type {Book} from "@/api/book/types";
import {store } from "@/redux/store";
import {toggleFavorite} from "@/redux/slice/favoriteSlice";
import {BOOKS_STORAGE_KEY, BOOKS_MAX_HISTORY} from "@/constants";

export const booksStorage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const value = localStorage.getItem(key);

            return value !== null
                ? JSON.parse(value)
                : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: <T>(key: string, value: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Storage set error:", error);
        }
    },

    remove: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Storage remove error:", error);
        }
    },
};

export const getSearchHistory = (): string[] => {
    const saved = booksStorage.get<unknown>(BOOKS_STORAGE_KEY.HISTORY, []);
    if (!Array.isArray(saved)) return [];
    return saved
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item, idx, arr) =>
            item.length > 0 && arr.indexOf(item) === idx
        )
        .slice(0, BOOKS_MAX_HISTORY);
};

export const saveSearchHistory = (history: string[]): void => {
    booksStorage.set(BOOKS_STORAGE_KEY.HISTORY, history);
};

export const addSearchHistory = (history: string[], value: string): string[] => {
    const keyword = value.trim();
    if (!keyword) return history;
    return [
        keyword,
        ...history.filter((item) => item !== keyword),
    ].slice(0, BOOKS_MAX_HISTORY);
};

export const removeSearchHistory = (history: string[], keyword: string): string[] => {
    return history.filter((item) => item !== keyword);
};

export const getBookKey = (book: Book): string => {
    const isbnList = book.isbn.trim().split(/\s+/).filter(Boolean);
    const isbn13 = isbnList.find((isbn) => /^\d{13}$/.test(isbn));
    return isbn13 || isbnList[0] || book.url;
};

export const updateFavorite = (book: Book) => {
    store.dispatch(toggleFavorite(book));
    booksStorage.set(
        BOOKS_STORAGE_KEY.FAVORITE,
        store.getState().favorite.list
    );
};