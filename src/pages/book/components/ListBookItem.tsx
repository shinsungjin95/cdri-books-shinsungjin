import styled from "styled-components";
import Button from "@/common/components/Button";
import type {Book} from "@/api/book/types";
import {theme} from "@/styles/theme";

interface ListBookItemProps {
    book: Book;
    isOpen: boolean;
    onToggle: () => void;
    isFavorite?: boolean;
    onFavorite?: (book: Book) => void;
}

const ListBookItem = ({
                          book,
                          isOpen,
                          onToggle,
                          isFavorite = false,
                          onFavorite,
                      }: ListBookItemProps) => {
    const hasSalePrice = book.sale_price >= 0;
    const displayPrice = hasSalePrice ? book.sale_price : book.price;
    const formatPrice = (price: number) => {
        return `${price.toLocaleString("ko-KR")}원`;
    };
    const openPurchasePage = () => {
        if (!book.url) return;
        window.open(book.url, "_blank", "noopener,noreferrer");
    };

    return (
        <ListBookItemWrap $isOpen={isOpen}>
            <div className={"thumbnail-area"}>
                {book.thumbnail ? (
                    <img className={"thumbnail"} src={book.thumbnail} alt={book.title} />
                ) : (
                    <div className={"empty-thumbnail"}>
                        -
                    </div>
                )}
                <div className={"favorite-area"}
                     onClick={() => onFavorite?.(book)}
                >
                    {
                        isFavorite ?
                            <img src={"/icons/favorite_ico.png"} alt={"찜완료"} />
                            :
                            <img src={"/icons/un_favorite_ico.png"} alt={"찜이전"} />
                    }
                </div>
            </div>
            <div className={"info-area"}>
                <div className={"title-area"}>
                    <h3 className={"book-title"}>
                        {book.title}
                    </h3>

                    <span className={"book-author"}>
                        {book.authors.join(", ")}
                    </span>
                </div>
                {
                    isOpen &&
                    <div className={"description-area"}>
                        {
                            book.contents ?
                                <div className={"description-inner"}>
                                    <h4>책 소개</h4>
                                    <p>
                                        {book.contents}
                                    </p>
                                </div>
                                :
                                "-"
                        }
                    </div>
                }
            </div>
            {
                !isOpen &&
                <div className={"price-area"}>
                    {formatPrice(displayPrice)}
                </div>
            }
            <div className={"action-area"}>
                {
                    !isOpen &&
                    <Button
                        brand
                        fullWidth
                        size={"md"}
                        radius={"md"}
                        onClick={openPurchasePage}
                        className={"purchase-btn"}
                    >
                        구매하기
                    </Button>
                }
                <Button
                    fullWidth
                    size={"md"}
                    radius={"md"}
                    gap={6}
                    aria-expanded={isOpen}
                    onClick={onToggle}
                >
                    상세보기

                    <div className={"detail-ico-wrap"}>
                        <img src={"/icons/detail_arrow_ico.png"} alt="상세보기" />
                    </div>
                </Button>
                {
                    isOpen &&
                    <div className={"detail-price-wrap"}>
                        <div className={"detail-price-inner"}>
                            <div className={"original-price"}>
                                <span className={"title"}>원가</span>
                                <span
                                    className={`price ${hasSalePrice ? "discounted": ""}`}
                                >
                                    {formatPrice(book.price)}
                                </span>
                            </div>

                            {hasSalePrice && (
                                <div className={"sale-price"}>
                                    <span className={"title"}>할인가</span>
                                    <span className={"price"}>
                                        {formatPrice(book.sale_price)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <Button
                            brand
                            fullWidth
                            size={"md"}
                            radius={"md"}
                            onClick={openPurchasePage}
                            className={"purchase-btn"}
                        >
                            구매하기
                        </Button>
                    </div>
                }
            </div>
        </ListBookItemWrap>
    );
};

const ListBookItemWrap = styled.div<{
    $isOpen: boolean;
}>`
    display: flex;
    align-items: ${({ $isOpen }) => $isOpen ? "flex-start" : "center"};
    padding: ${({ $isOpen }) => $isOpen ? "24px 16px 40px 47px" : "16px 16px 16px 47px"};
    border-bottom: 1px solid #D2D6DA;
    transition: padding 0.35s ease;
    .thumbnail-area {
        position: relative;
        flex-shrink: 0;
        width: ${({ $isOpen }) => $isOpen ? "210px" : "48px"};
        height: ${({ $isOpen }) => $isOpen ? "280px" : "68px"};
        transition: width 0.3s ease, height 0.3s ease;

        .thumbnail {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .empty-thumbnail {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        
        .favorite-area{
            position: absolute;
            top: ${({ $isOpen }) => $isOpen ? "12px" : "2px"};
            right: ${({ $isOpen }) => $isOpen ? "10px" : "2px"};
            width: ${({ $isOpen }) => $isOpen ? "20px" : "13px"};
            height: ${({ $isOpen }) => $isOpen ? "18px" : "12px"};
            transition: width 0.35s ease, height 0.35s ease, top 0.35s ease, right 0.35s ease;
            cursor: pointer;
        }
    }

    .info-area {
        flex: 1;
        min-width: 0;
        margin: ${({ $isOpen }) => $isOpen ? "0 48px 0 32px" : "0 22px 0 48px"};
        transition: padding 0.35s ease;

        .title-area {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;

            .book-title {
                font-weight: 700;
                font-size: 18px;
                line-height: 18px;
            }

            .book-author {
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
                color: ${theme.colors.palette.gray800};
            }
        }
        .description-area {
            margin-top: 16px;
            .description-inner {
                display: flex;
                flex-direction: column;
                gap: 12px;
                align-items: start;
                h4 {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 26px;
                }
                p {
                    font-weight: 500;
                    font-size: 10px;
                    line-height: 16px;
                    white-space: pre-wrap;
                }
            }
        }
    }

    .price-area{
        margin-right: 56px;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
    }
    
    .action-area {
        display: flex;
        align-self: ${({ $isOpen }) => $isOpen ? "stretch" : "center"};
        align-items: ${({ $isOpen }) => $isOpen ? "flex-end" : "center"};
        flex-direction: ${({ $isOpen }) => $isOpen ? "column" : "row"};
        justify-content: ${({ $isOpen }) => $isOpen ? "space-between" : "flex-end"};
        gap: 8px;
        width: 240px;
        button{
            width: 115px;
            &.purchase-btn{
                width: ${({ $isOpen }) => $isOpen ? "100%" : "115px"};
            }
        }
        .detail-ico-wrap {
            width: 8px;
            height: 28px;
            transform: rotate(
                    ${({$isOpen}) => $isOpen ? "180deg" : "0deg"}
            );
            transition: transform 0.3s ease;
        }
        .detail-price-wrap{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 28px;
            .detail-price-inner{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: flex-end;
                gap: 8px;
                .title{
                    font-weight: 500;
                    font-size: 10px;
                    line-height: 22px;
                    color: ${theme.colors.palette.gray700};
                }
                .price {
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 26px;
                }

                .original-price,
                .sale-price {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .discounted {
                    text-decoration: line-through;
                    font-weight: 400;
                }
            }
        }
    }
`;

export default ListBookItem;