import styled from "styled-components";
import {theme} from "@/styles/theme";
import React, {type ElementType} from "react";

type SizeType = keyof typeof SIZE_MAP;
type RadiusType = keyof typeof RADIUS_MAP | "half" | "pill" | number;

const SIZE_MAP = {
    sm: {height: 35, padding: "0 10px", fontSize: 14, fontWeight: 400},
    md: {height: 48, padding: "0 20px", fontSize: 15, fontWeight: 700},
    lg: {height: 52, padding: "0 40px", fontSize: 16, fontWeight: 700},
};

const RADIUS_MAP = {sm: 4, md: 8, lg: 12,};

type ButtonOwnProps = {
    children: React.ReactNode;
    size?: SizeType;
    radius?: RadiusType;
    brand?: boolean;
    outlined?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    gap?: number;
};

type ButtonProps<T extends ElementType = "button"> =
    ButtonOwnProps & {
    as?: T;
} & Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ButtonOwnProps | "as"
>;

const Button = <T extends ElementType = "button">({
                                                      children,
                                                      as,
                                                      size = "md",
                                                      radius = "md",
                                                      brand = false,
                                                      outlined = false,
                                                      fullWidth = false,
                                                      disabled = false,
                                                      gap = 10,
                                                      ...props
                                                  }: ButtonProps<T>) => {
    return (
        <ButtonWrapper
            as={as}
            type={as ? undefined : "button"}
            $size={size}
            $radius={radius}
            $brand={brand}
            $outlined={outlined}
            $fullWidth={fullWidth}
            $gap={gap}
            disabled={disabled}
            {...props}
        >
            {children}
        </ButtonWrapper>
    );
};

type ButtonStyleProps = {
    $size: SizeType;
    $radius: RadiusType;
    $brand: boolean;
    $outlined: boolean;
    $fullWidth: boolean;
    $gap: number;
};

const ButtonWrapper = styled.button<ButtonStyleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-out;
    gap: ${({ $gap }) => `${$gap}px`};
    width: ${({ $fullWidth }) => $fullWidth ? "100%" : "auto"};
    height: ${({ $size }) => SIZE_MAP[$size].height}px;
    padding: ${({ $size }) => SIZE_MAP[$size].padding};
    font-size: ${({ $size }) => SIZE_MAP[$size].fontSize}px;
    font-weight: ${({ $size }) => SIZE_MAP[$size].fontWeight};
    border-radius: ${({ $radius, $size }) => {
        const height = SIZE_MAP[$size].height;
        if ($radius === "half") return `${height / 2}px`;
        if ($radius === "pill") return "9999px";
        if (typeof $radius === "number") return `${$radius}px`;
        return `${RADIUS_MAP[$radius]}px`;
    }};
    border: 1px solid transparent;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    ${({ $brand, $outlined, disabled }) => {
        if (disabled) {
            return `
                background-color: ${theme.colors.palette.gray100};
                color: ${theme.colors.palette.gray700};
                border-color: ${$outlined ? theme.colors.palette.gray300 : "transparent"};
            `;
        }
        if ($brand && $outlined) {
            return `
                background-color: #FFFFFF;
                color: #4880EE;
                border-color: #4880EE;

                &:hover {
                    background-color: #FFFFFF;
                    color: #8D94A0;
                    border-color: #8D94A0;
                }
            `;
        }
        if ($brand && !$outlined) {
            return `
                background-color: #4880EE;
                color: #FFFFFF;

                &:hover {
                    background-color: #F2F4F6;
                    color: #6D7582;
                }
            `;
        }
        if (!$brand && $outlined) {
            return `
                background-color: #FFFFFF;
                color: #8D94A0;
                border-color: #8D94A0;

                &:hover {
                    background-color: #4880EE;
                    color: #FFFFFF;
                    border-color: #4880EE;
                }
            `;
        }
        return `
            background-color: #F2F4F6;
            color: #6D7582;

            &:hover {
                background-color: #4880EE;
                color: #FFFFFF;
            }
        `;
    }}
`;

export default Button;