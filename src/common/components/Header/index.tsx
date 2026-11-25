import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {HEADER_LIST} from "@/constants";
import {theme} from "@/styles/theme";

const Header = () => {
    return (
        <HeaderWrap>
            <div className={"header-inner"}>
                <div className={"logo-area"}>
                    CERTICOS BOOKS
                </div>
                <nav className={"nav-area"}>
                    {
                        HEADER_LIST.map((item) => (
                            <NavLink
                                key={item.path}
                                to={`/${item.path}`}
                                end
                            >
                                {item.name}
                            </NavLink>
                        ))
                    }
                </nav>
            </div>
        </HeaderWrap>
    )
}

const HeaderWrap = styled.header`
    height: ${theme.size.headerHeight};
    background-color:  ${theme.colors.palette.white};
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .header-inner{
        height: 100%;
        padding: 0 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        .logo-area{
            position: absolute;
            left: 160px;
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
            letter-spacing: 0;
        }
    }
    .nav-area {
        display: flex;
        align-items: center;
        gap: 56px;
        a {
            font-weight: 500;
            font-size: 20px;
            line-height: 20px;
            position: relative;
            &.active {
                &::after{
                    content: "";
                    width: 100%;
                    height: 1px;
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    background-color: ${theme.colors.primary.main};
                }
            }
        }
    }
`

export default Header;