import { theme } from "./default";
import { createTheme } from "@mui/material";

const overrides = {
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "35px",
      lineHeight: 1.167,
    },
    h2: {
      fontWeight: 700,
      fontSize: "30px",
      lineHeight: 1.167,
    },
    h3: {
      fontWeight: 600,
      fontSize: "25px",
      lineHeight: 1.167,
    },
    h4: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: 1.435,
    },
    h5: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 600,
      fontSize: "15px",
      lineHeight: 1.6,
    },
    subtitile1: {
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: 1.75,
    },
    subtitile2: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.57,
    },
    body1: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: 1.8,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    body3: {
      fontWeight: 400,
      fontSize: "11px",
      lineHeight: 1.8,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    body4: {
      fontWeight: 400,
      fontSize: "10px",
      lineHeight: 2.5,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    fontFamily: `"IRANSans", "sans-serif", "serif" `,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    // fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default {
  main: createTheme({ ...theme, ...overrides }),
};
