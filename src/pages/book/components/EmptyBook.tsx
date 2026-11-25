import styled from "styled-components";
import {theme} from "@/styles/theme";

interface EmptyBookProps {
    info: string;
}

const EmptyBook = ({ info }: EmptyBookProps) => {
    return(
        <EmptyBookWrap>
            <div className={"ico-wrap"}>
                <img src={"/icons/sample_book_ico.png"} alt="삭제" />
            </div>
            <span className={"empty-info"}>{info}</span>
        </EmptyBookWrap>
    )
}

const EmptyBookWrap = styled.div`
    margin: 120px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .ico-wrap{
        width: 80px;
    }
    span{
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        color: ${theme.colors.palette.gray800};
    }
`

export  default EmptyBook