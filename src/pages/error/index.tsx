import styled from "styled-components";
import { theme } from "@/styles/theme";

const ErrorPage = () => {
    return(
        <ErrorPageWrapper>
            <ErrorContainer>
                <div className={"error-message"}>
                    <p>오류가 발생했습니다!</p>
                    <span>
                        이용에 불편을 드려 죄송합니다.
                    </span>
                </div>
            </ErrorContainer>

        </ErrorPageWrapper>
    )
}

const ErrorPageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #fff;
    position: relative;
`;
const ErrorContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .error-message {
        text-align: center;

        p {
            color: #333;
            font-weight: 500;
            font-size: 22px;
            margin: 20px 0;
        }

        span {
            font-size: 25px;
            line-height: 1.25;
            color: ${theme.colors.palette.brand900};
        }
    }
`;

export default ErrorPage;