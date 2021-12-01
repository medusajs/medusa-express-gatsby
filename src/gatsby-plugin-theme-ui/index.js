const theme = {
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "Georgia, serif",
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  colors: {
    primary: "#000",
    medusaGreen: "#56FBB1",
    medusa100: "#454B54",
    deepBlue: "#0A3149",
    ui: "#F7F7FA",
    cool: "#EEF0F5",
    background: "#F7F7FA",
    salmon: "#FF9B9B",
  },
  cards: {
    container: {
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(60, 66, 87, 0.16), 0px 2px 5px rgba(60, 66, 87, 0.08)",
    },
  },
  buttons: {
    cta: {
      bg: "deepBlue",
      color: "white",
      fontWeight: "500",
      p: "6px, 8px, 6px, 8px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    incrementor: {
      bg: "transparent",
      color: "primary",
      flexGrow: "1",
      height: "33px",
      border: "none",
      borderRadius: "0 4px 4px 0",
      "&:hover": {
        bg: "ui",
      },
    },
    decrementor: {
      bg: "transparent",
      color: "primary",
      flexGrow: "1",
      height: "33px",
      border: "none",
      borderRadius: "4px 0 0 4px",
      "&:hover": {
        bg: "ui",
      },
      edit: {
        bg: "transparent",
        color: "primary",
        cursor: "pointer",
        textDecoration: "underline",
      },
    },
  },
  text: {
    fz_s: {
      fontSize: "10px",
    },
    header3: {
      fontSize: "18px",
      fontWeight: "700",
    },
    summary: {
      py: ".1em",
    },
  },
  forms: {
    select: {
      bg: "cool",
      border: "none",
    },
    input: {
      bg: "cool",
      border: "none",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      background: "ui",
    },
  },
};

export default theme;
