import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Book} from "@/api/book/types";
import {getBookKey} from "@/utils/book";
import {booksStorage} from "@/utils/book";
import {BOOKS_STORAGE_KEY} from "@/constants";

interface FavoriteState {
    list: Book[];
}

const initialState: FavoriteState = {
    list: booksStorage.get<Book[]>(
        BOOKS_STORAGE_KEY.FAVORITE,
        []
    ),
};
const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Book>) => {
            const book = action.payload;
            const bookKey = getBookKey(book);

            const isFavorite = state.list.find(
                (item) => getBookKey(item) === bookKey
            );

            if (isFavorite) {
                state.list = state.list.filter(
                    (item) => getBookKey(item) !== bookKey
                );
            } else {
                state.list.unshift(book);
            }
        },
    },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;