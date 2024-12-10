import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
    },
  },
  colors: {
    brand: {
      primary: "#31E981",
      dark: "#000000",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
      },
      variants: {
        solid: {
          bg: "brand.primary",
          color: "black",
          _hover: {
            bg: "brand.primary",
            opacity: 0.8,
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          transition: "all 0.2s",
        },
        outline: {
          borderColor: "brand.primary",
          color: "brand.primary",
          _hover: {
            bg: "transparent",
            opacity: 0.8,
            transform: "translateY(-2px)",
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: "whiteAlpha.100",
            borderColor: "whiteAlpha.200",
            _hover: {
              bg: "whiteAlpha.200",
            },
            _focus: {
              bg: "whiteAlpha.200",
              borderColor: "brand.primary",
            },
          },
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
  },
});
