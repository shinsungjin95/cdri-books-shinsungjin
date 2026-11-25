import styled from "styled-components";
import {theme} from "@/styles/theme";

interface ResultCountProps {
    text: string;
    count: number;
}

const ResultCount = ({ text, count }: ResultCountProps) => {
    return(
        <ResultCountWrap>
            {text} 총 <span>{count}</span>건
        </ResultCountWrap>
    )
}
const ResultCountWrap = styled.p`
    margin-top: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    span{
        color: ${theme.colors.primary.main};
    }
`
export default ResultCount;