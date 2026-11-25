import {useState, useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";
import {useBooks} from "@/api/book/hooks";
import type {Book, BookSearchTarget, DetailSearchData} from "@/api/book/types";
import {getSearchHistory, saveSearchHistory, addSearchHistory, removeSearchHistory, getBookKey, updateFavorite} from "@/utils/book";
import styled from "styled-components";
import Button from "@/common/components/Button";
import BookTitle from "@/pages/book/components/BookTitle.tsx";
import ResultCount from "@/pages/book/components/ResultCount.tsx";
import {theme} from "@/styles/theme";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {useModal} from "@/common/components/Modal/hooks.ts";
import EmptyBook from "@/pages/book/components/EmptyBook.tsx";
import ListBookItem from "@/pages/book/components/ListBookItem.tsx";
import {useAppSelector} from "@/redux/hook";
import ScrollLoading from "@/common/components/Loading/ScrollLoading.tsx";

const BookList = () => {
    const {callModal} = useModal();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("query") ?? "";
    const targetParam = searchParams.get("target");
    const searchTarget = targetParam === "title" || targetParam === "publisher" || targetParam === "person" ? targetParam : undefined;
    const searchKey = JSON.stringify([searchQuery, searchTarget]);
    const [inputQuery, setInputQuery] = useState(searchTarget ? "" : searchQuery);
    const [pagination, setPagination] = useState({searchKey, page: 1});
    const page = pagination.searchKey === searchKey ? pagination.page : 1;
    const [bookList, setBookList] = useState<Book[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>(getSearchHistory);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [activeBookIdx, setActiveBookIdx] = useState<number | null>(null);
    const searchAreaRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<HTMLDivElement>(null);

    const {data, isFetching, isPlaceholderData} = useBooks({
        query: searchQuery,
        target: searchTarget,
        page,
        size: 10,
    });

    const totalCount = data?.meta.total_count ?? 0;
    const isEnd = data?.meta.is_end ?? true;
    const canLoadNextPage = !isEnd && !isFetching && !isPlaceholderData;

    useEffect(() => {
        saveSearchHistory(searchHistory);
    }, [searchHistory]);

    useEffect(() => {
        setInputQuery(searchTarget ? "" : searchQuery);
        setPagination({ searchKey, page: 1 });
        setBookList([]);
        setActiveBookIdx(null);
        window.scrollTo(0, 0);
    }, [searchQuery, searchTarget, searchKey]);

    useEffect(() => {
        if (!data || isPlaceholderData) return;
        setBookList((prev) => {
            if (page === 1) {
                return data.documents;
            }
            const startIndex = (page - 1) * 10;
            return [
                ...prev.slice(0, startIndex),
                ...data.documents,
            ];
        });
    }, [data, page, searchKey, isPlaceholderData]);

    useEffect(() => {
        const element = observerRef.current;
        if (!element || !canLoadNextPage || !bookList.length) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect();

                setPagination({
                    searchKey,
                    page: page + 1,
                });
            }
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [canLoadNextPage, searchKey, page, bookList.length]);


    useEffect(() => {
        const handleOutsideClick = (e: PointerEvent) => {
            if (
                searchAreaRef.current &&
                !searchAreaRef.current.contains(e.target as Node)
            ) {
                setIsHistoryOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
        };
    }, []);

    const setPage = (value: number) => {
        setPagination({searchKey, page: value});
    };

    const setHistoryAdd = (value: string) => {
        setSearchHistory((prev) => addSearchHistory(prev, value));
    };

    const setHistoryRemove = (keyword: string) => {
        setSearchHistory((prev) => removeSearchHistory(prev, keyword));
    };

    const setSearch = (value: string = inputQuery, saveHistory: boolean = true) => {
        const query = value.trim();
        if (query && saveHistory) {
            setHistoryAdd(query);
        }
        setInputQuery(query);
        setPage(1);
        setIsHistoryOpen(false);
        setActiveBookIdx(null);
        setSearchParams(query ? { query } : {});
        window.scrollTo(0, 0);
    };

    const setDetailSearch = (value: string, target: BookSearchTarget) => {
        const query = value.trim();
        if (!query) return;
        setInputQuery("");
        setPage(1);
        setIsHistoryOpen(false);
        setSearchParams({
            query,
            target,
        });
    };

    const toggleBookDetail = (idx: number) => {
        setActiveBookIdx((prev) => prev === idx ? null : idx);
    };

    const favoriteList = useAppSelector((state) => state.favorite.list);

    const isFavoriteBook = (book: Book): boolean => {
        return favoriteList.find(
            (item) => getBookKey(item) === getBookKey(book)
        ) !== undefined;
    };

    const handleFavorite = (book: Book) => {
        updateFavorite(book);
    };

    return (
        <BookListWrap>
            <BookTitle>도서 검색</BookTitle>
            <div className={"search-wrap"}>
                <div
                    ref={searchAreaRef}
                    className={`input-area ${isHistoryOpen && searchHistory.length > 0 ? "active" : ""}`}
                    onClick={() => setIsHistoryOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setIsHistoryOpen(false);
                        }
                    }}
                >
                    <div className={"input-box"}>
                        <div className={"ico-wrap"}>
                            <img src={"/icons/glasses_ico.png"} alt="검색" />
                        </div>
                        <input
                            value={inputQuery}
                            placeholder={"검색어를 입력하세요"}
                            onFocus={() => setIsHistoryOpen(true)}
                            onChange={(e) => setInputQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                                    setSearch();
                                }
                            }}
                        />
                    </div>

                    {isHistoryOpen && searchHistory.length > 0 && (
                        <div className={"history-area"}>
                            {searchHistory.map((keyword) => (
                                <div className={"history-item"}
                                     key={keyword}
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         setSearch(keyword, false);
                                     }}
                                >
                                    <div className={"keyword"}>{keyword}</div>
                                    <div className={"remove-ico-wrap"}
                                         onClick={(e) => {
                                             e.stopPropagation();
                                             setHistoryRemove(keyword);
                                         }}
                                    >
                                        <img src={"/icons/remove_ico.png"} alt="삭제" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={"detail-area"}>
                    <Button
                        outlined
                        size={"sm"}
                        radius={"md"}
                        onClick={(e) => {
                            setIsHistoryOpen(false);
                            const rect = e.currentTarget.getBoundingClientRect();
                            callModal(
                                MODAL_PAYLOAD.SEARCH_DETAIL_BOOK_MODAL({
                                    props: {
                                        searchQuery: searchTarget ? searchQuery : "",
                                        searchTarget,
                                        position: {top: rect.bottom + 8, left: rect.left, right: rect.right},
                                        onConfirm: (data) => {
                                            const { query, target } = data as DetailSearchData;
                                            setDetailSearch(query, target);
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        상세검색
                    </Button>
                </div>
            </div>


            <ResultCount
                text={"도서 검색 결과"}
                count={totalCount}
            />
            {
                bookList.length > 0 ? (
                    <div className={"list-book-area"}>
                        {
                            bookList.map((book, idx) =>
                                <ListBookItem
                                    key={idx}
                                    book={book}
                                    isOpen={activeBookIdx === idx}
                                    onToggle={() => toggleBookDetail(idx)}
                                    isFavorite={isFavoriteBook(book)}
                                    onFavorite={handleFavorite}
                                />
                            )
                        }
                        {page > 1 && isFetching && isPlaceholderData && (
                            <ScrollLoading />
                        )}
                        {!isEnd && (
                            <div
                                ref={observerRef}
                                style={{ height: 1 }}
                            />
                        )}
                    </div>
                ) : (
                    <EmptyBook info={"검색된 결과가 없습니다."} />
                )
            }
        </BookListWrap>
    );
};

const BookListWrap = styled.div`
    padding: 80px 0 158px;
    .search-wrap {
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .input-area {
        position: relative;
        width: 480px;
        height: 50px;
        border-radius: 100px;
        background: #F2F4F6;

        &.active {
            border-radius: 24px 24px 0 0;
        }
        .input-box {
            display: flex;
            align-items: center;
            height: 50px;
            padding: 0 16px;
            gap: 16px;
            .ico-wrap{
                width: 20px;
            }
            input {
                flex: 1;
                min-width: 0;
                background-color: transparent;
                font-weight: 500;
                font-size: 16px;
                line-height: 16px;
                &::placeholder {
                    color: ${theme.colors.palette.gray700};
                    opacity: 1;
                }
            }
        }

        .history-area {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            padding: 8px 28px 16px 50px;
            box-sizing: border-box;
            background: #F2F4F6;
            border-radius: 0 0 24px 24px;
            z-index: 10;
            .history-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-height: 40px;
                .keyword{
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 16px;
                    color: ${theme.colors.palette.gray700};
                    cursor: pointer;
                }
                .remove-ico-wrap{
                    width: 16px;
                    cursor: pointer;
                }
            }
        }
    }
    .list-book-area{
        margin-top: 36px;
    }
`

export default BookList;