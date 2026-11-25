import styled from "styled-components";
import {theme} from "@/styles/theme";
import type {ReactNode} from "react";

const BookTitle = ({ children }: { children: ReactNode }) => {
    return (
        <BookTitleWrap>
            {children}
        </BookTitleWrap>
    );
};
const BookTitleWrap = styled.h1`
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
    color: ${theme.colors.palette.black50};
`
export default BookTitle;