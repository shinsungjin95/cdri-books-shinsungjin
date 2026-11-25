
const palette = {
    brand900: "#4880EE",
    brand700: "#353C49",
    gray800: "#6D7582",
    gray700: "#8D94A0",
    gray300: "#DADADA",
    gray100: "#DADADA",
    black100: "#222222",
    black50: "#1A1E27",
    white: "#FFFFFF",
    red: "#E84118",
};

export const theme = {
    colors: {
        palette,

        primary: {
            main: palette.brand900,
            light: palette.gray300,
        },

        gray: {
            white: palette.white,
            main: palette.brand700,
            black: palette.black100,
        },

        error: {
            main: palette.red,
        },
    },

    fonts: {
        family: `"Pretendard", "Noto Sans KR", sans-serif`,
        size: "14px",
        color: palette.brand700,
    },

    size: {
        headerHeight: "80px",
    },
};
