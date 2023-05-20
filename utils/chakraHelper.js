import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#fff0f7",
      100: "#ffd6e8",
      200: "#ffafd2",
      300: "#ff7eb6",
      400: "#ee5396",
      500: "#d02670",
      600: "#9f1853",
      700: "#740937",
      800: "#510224",
      900: "#2a0a18",
    },
    cyan: {
      50: "#e5f6ff",
      100: "#bae6ff",
      200: "#82cfff",
      300: "#33b1ff",
      400: "#1192e8",
      500: "#0072c3",
      600: "#00539a",
      700: "#393939",
      800: "#003a6d",
      900: "#061727",
    },
    gray: {
      50: "#f4f4f4",
      100: "#e0e0e0",
      200: "#c6c6c6",
      300: "#a8a8a8",
      400: "#8d8d8d",
      500: "#6f6f6f",
      600: "#525252",
      700: "#393939",
      800: "#262626",
      900: "#161616",
    },
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "16px",
        color: "gray.800",
        overflowX: "hidden",
        lineHeight: 1.25,
      },
    },
  },
  fonts: {
    heading: "roboto, sans-serif",
    body: "roboto, sans-serif",
  },
  fontSizes: {
    "4xl": "1rem",
  },
  fontWeights: {
    bold: 800,
  },

  components: {
    Heading: {
      baseStyle: {
        mb: 4,
      },
    },
    Text: {
      baseStyle: {
        mb: 4,
      },
    },
    Link: {
      baseStyle: {
        color: "primary.500",
        _hover: {
          textDecoration: "none",
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "normal",
        mb: 4,
      },
    },
  },
});

export default theme;
