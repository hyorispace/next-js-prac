const colors = {
  white: "#FFFFFF",
  black: "#000000",
  primary: {
    100: "#D0E4FF",
    200: "#6F96D1",
    300: "#344EAD",
    400: "#091F5B",
    opacity10: "rgba(9, 31, 91, 0.1)",
    opacity15: "rgba(9, 31, 91, 0.15)",
    opacity20: "rgba(9, 31, 91, 0.2)",
    opacity50: "rgba(9, 31, 91, 0.5)",
    opacityRight: "rgba(111, 150, 209, 0.5)",
  },
  secondary: {
    100: "#EDF0F5",
    200: "#CCD3E0",
  },
  error: "#FF0000",
};

const breakpoints = {
  mobile: "screen and (max-width: 767px)",
  tablet: "screen and (min-width: 768px)",
  desktop: "screen and (min-width: 1250px)",
};

const fontSize = {
  sm: "14px",
  md: "16px",
};

const fontWeight = {
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const heights = {
  header: {
    mobile: "120px",
    tablet: "70px",
  },
};

const theme = {
  colors,
  breakpoints,
  fontSize,
  fontWeight,
  heights,
};

export type Colors = typeof colors;
export type Breakpoints = typeof breakpoints;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type Heights = typeof heights;

export default theme;
