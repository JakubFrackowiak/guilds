import { ThemeOptions } from "@mui/material/styles"

const typography: ThemeOptions["typography"] = {
  fontFamily: "Plus Jakarta Sans, sans-serif",
  h1: {
    fontSize: "3.5rem",
    fontWeight: 600,
    lineHeight: "72px",
    letterSpacing: "-0.02em",
    textAlign: "left",
  },
  h3: {
    fontWeight: 700,
    fontSize: "2.5rem",
    lineHeight: 1.167,
    letterSpacing: "-0.01562em",
    marginBottom: "1rem",
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    marginBottom: "1rem",
    color: "#667085",
  },
  formBody: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
  },
}

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#E31B54",
      light: "#FFF1F3",
      dark: "#A11043",
    },
    secondary: {
      main: "#101828",
      light: "#1D2939",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F9FAFB",
    },
    text: {
      primary: "#101828",
      secondary: "#667085",
    },
    button: {
      primary: "#E31B54",
      secondary: "#FFFFFF",
      primaryText: "#FFFFFF",
      secondaryText: "#344054",
      primaryHover: "#C01048",
      secondaryHover: "#FFF1F3",
    },
  },
  typography,
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
}

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#E31B54",
      light: "#FFF1F3",
      dark: "#A11043",
    },
    secondary: {
      main: "#FFFFFF",
      light: "#EAECF0",
    },
    background: {
      default: "#101828",
      paper: "#1D2939",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#EAECF0",
    },
    button: {
      primary: "#E31B54",
      secondary: "#FFFFFF",
      primaryText: "#FFFFFF",
      secondaryText: "#344054",
      primaryHover: "#C01048",
      secondaryHover: "#FFF1F3",
    },
  },
  typography,
}

declare module "@mui/material/styles" {
  interface Palette {
    button: {
      primary: string
      secondary: string
      primaryText: string
      secondaryText: string
      primaryHover: string
      secondaryHover: string
    }
  }
  interface PaletteOptions {
    button: {
      primary: string
      secondary: string
      primaryText: string
      secondaryText: string
      primaryHover: string
      secondaryHover: string
    }
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    formBody: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    formBody?: React.CSSProperties
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    formBody: true
  }
}
