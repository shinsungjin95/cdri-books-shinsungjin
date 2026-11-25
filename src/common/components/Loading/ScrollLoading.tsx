import styled, {keyframes} from "styled-components";

const ScrollLoading = () => {
    return (
        <ScrollLoadingWrap>
            <span />
            <span />
            <span />
        </ScrollLoadingWrap>
    );
};

const pulse = keyframes`
    0%, 100% {
        opacity: 0.25;
    }

    50% {
        opacity: 1;
    }
`;

const ScrollLoadingWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 24px 0;

    span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #4880EE;
        animation: ${pulse} 1.2s ease-in-out infinite;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
`;

export default ScrollLoading;