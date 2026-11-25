import {useState} from "react";
import styled from "styled-components";
import Select from "react-select";
import Button from "@/common/components/Button";
import type {ModalContentProps} from "../types";
import {ModalWrapper, ModalItem} from "../style";
import type {BookSearchTarget, DetailSearchData} from "@/api/book/types";
import {theme} from "@/styles/theme";
import {MODAL_PAYLOAD} from "@/constants/Modal.ts";
import {useModal} from "@/common/components/Modal/hooks.ts";

interface SearchOption {
    label: string;
    value: BookSearchTarget;
}

interface SearchDetailBookModalProps extends ModalContentProps {
    searchQuery?: string;
    searchTarget?: BookSearchTarget;
}

const SEARCH_OPTIONS: SearchOption[] = [
    { label: "제목", value: "title" },
    { label: "저자명", value: "person" },
    { label: "출판사", value: "publisher" },
];

const SearchDetailBookModal = ({
                                   modalDepth,
                                   width,
                                   position,
                                   onConfirm,
                                   onCancel,
                                   searchQuery = "",
                                   searchTarget,
                               }: SearchDetailBookModalProps) => {
    const {callModal} = useModal();
    const [selectedOption, setSelectedOption] = useState<SearchOption>(
        SEARCH_OPTIONS.find(
            (item) => item.value === searchTarget
        ) ?? SEARCH_OPTIONS[0]
    );

    const [inputQuery, setInputQuery] = useState(searchQuery);

    const setSearch = () => {
        const query = inputQuery.trim();
        if (!query) {
            callModal(
                MODAL_PAYLOAD.ERROR_CONFIRM({
                    props: {
                        message: "검색어를 입력해 주세요.",
                    },
                })
            );
            return;
        }
        const data: DetailSearchData = {query, target: selectedOption.value};
        onConfirm?.(data);
    };

    return (
        <ModalWrapper
            $modalDepth={modalDepth}
            $position={position}
            $width={width}
        >
            <ModalItem $width={"100%"}>
                <SearchDetailBookModalWrap>
                    <div
                        className={"close-ico-wrap"}
                        onClick={() => onCancel?.()}
                    >
                        <img
                            src={"/icons/modal_close_ico.png"}
                            alt={"모달 닫기"}
                        />
                    </div>

                    <div className={"search-area"}>
                        <Select<SearchOption, false>
                            className={"search-select"}
                            classNamePrefix={"search-select"}
                            options={SEARCH_OPTIONS.filter(
                                (item) => item.value !== selectedOption.value
                            )}
                            value={selectedOption}
                            isSearchable={false}
                            onChange={(option) => {
                                if (option) {
                                    setSelectedOption(option);
                                    setInputQuery("");
                                }
                            }}
                        />

                        <input
                            value={inputQuery}
                            placeholder={"검색어 입력"}
                            onChange={(e) =>
                                setInputQuery(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                                    setSearch();
                                }
                            }}
                        />
                    </div>

                    <Button
                        brand
                        fullWidth
                        size={"sm"}
                        radius={"md"}
                        onClick={setSearch}
                    >
                        검색하기
                    </Button>
                </SearchDetailBookModalWrap>
            </ModalItem>
        </ModalWrapper>
    );
};


const SearchDetailBookModalWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 36px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 14px 6px #97979726;
    overflow: hidden;
    position: relative;

    .close-ico-wrap {
        position: absolute;
        width: 12px;
        top: 12px;
        right: 12px;
        cursor: pointer;
    }

    .search-area {
        display: flex;
        align-items: center;
        gap: 4px;

        .search-select {
            width: 100px;
            flex-shrink: 0;
        }

        .search-select__control {
            min-height: 36px;
            border: none;
            border-bottom: 1px solid #D2D6DA;
            border-radius: 0;
            box-shadow: none;
            cursor: pointer;
            height: 36px;
        }

        .search-select__indicator-separator {
            display: none;
        }

        .search-select__single-value {
            font-size: 14px;
            font-weight: 700;
            color: ${theme.colors.gray.main};
        }

        .search-select__menu {
            margin-top: 4px;
            border-radius: 0;
            z-index: 10;
        }

        .search-select__option {
            font-size: 14px;
            color: ${theme.colors.palette.gray700};
            cursor: pointer;
        }

        input {
            flex: 1;
            min-width: 0;
            height: 36px;
            padding: 0 8px;
            border: none;
            border-bottom: 1px solid ${theme.colors.primary.main};
            outline: none;
            font-size: 14px;

            &::placeholder {
                color: ${theme.colors.palette.gray700};
            }
        }
    }
`;

export default SearchDetailBookModal;























