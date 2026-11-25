import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            palette: {
                brand900: string;
                brand700: string;
                gray800: string;
                gray700: string;
                gray300: string;
                gray100: string;
                black100: string;
                black50: string;
                white: string;
                red: string;
            };

            primary: {
                main: string;
                light: string;
            };

            gray: {
                white: string;
                main: string;
                black: string;
            };

            error: {
                main: string;
            };
        };

        fonts: {
            family: string;
            size: string;
            color: string;
        };

        size: {
            headerHeight: string;
        };
    }
}