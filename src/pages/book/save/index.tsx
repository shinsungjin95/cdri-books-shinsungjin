import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {useAppSelector} from "@/redux/hook";
import {getBookKey, updateFavorite} from "@/utils/book";
import type { Book } from "@/api/book/types";
import BookTitle from "@/pages/book/components/BookTitle.tsx";
import ResultCount from "@/pages/book/components/ResultCount.tsx";
import ListBookItem from "@/pages/book/components/ListBookItem.tsx";
import EmptyBook from "@/pages/book/components/EmptyBook.tsx";

const BookSave = () => {
    const favoriteList = useAppSelector(
        (state) => state.favorite.list
    );
    const [page, setPage] = useState(1);
    const observerRef = useRef<HTMLDivElement>(null);
    const visibleBooks = favoriteList.slice(0, page * 10);
    const isEnd = visibleBooks.length >= favoriteList.length;
    const [activeBookKey, setActiveBookKey] = useState<string | null>(null);
    const toggleBookDetail = (bookKey: string) => {
        setActiveBookKey(prev =>
            prev === bookKey ? null : bookKey
        );
    };
    const handleFavorite = (book: Book) => {
        if (activeBookKey === getBookKey(book)) {
            setActiveBookKey(null);
        }
        updateFavorite(book);
    };
    useEffect(() => {
        const element = observerRef.current;
        if (!element || isEnd) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect();
                setPage(prev => prev + 1);
            }
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [page, isEnd]);
    return (
        <BookSaveWrap>
            <BookTitle>내가 찜한 책</BookTitle>

            <ResultCount
                text={"찜한 책"}
                count={favoriteList.length}
            />
            {
                favoriteList.length > 0 ? (
                    <div className={"list-book-area"}>
                        {
                            visibleBooks.map(book => {
                                const bookKey = getBookKey(book);

                                return (
                                    <ListBookItem
                                        key={bookKey}
                                        book={book}
                                        isOpen={activeBookKey === bookKey}
                                        onToggle={() => toggleBookDetail(bookKey)}
                                        isFavorite={true}
                                        onFavorite={handleFavorite}
                                    />
                                );
                            })
                        }

                        {!isEnd && (
                            <div
                                ref={observerRef}
                                style={{ height: 1 }}
                            />
                        )}
                    </div>
                ) : (
                    <EmptyBook info={"찜한 책이 없습니다."} />
                )
            }
        </BookSaveWrap>
    );
};

const BookSaveWrap = styled.div`
    padding: 80px 0px 158px;
    .list-book-area {
        width: 100%;
    }
`;

export default BookSave;