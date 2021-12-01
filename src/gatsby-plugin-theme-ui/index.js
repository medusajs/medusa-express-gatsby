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
    primary: "#0A3149",
    medusaGreen: "#56FBB1",
    medusa100: "#454B54",
    deepBlue: "#0A3149",
    ui: "#F7F7FA",
    cool: "#EEF0F5",
    background: "#F7F7FA",
    salmon: "#FF9B9B",
    placeholder: "#BBBBBB",
  },
  cards: {
    container: {
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(60, 66, 87, 0.16), 0px 2px 5px rgba(60, 66, 87, 0.08)",
    },
  },
  buttons: {
    cta: {
      bg: "primary",
      color: "white",
      fontWeight: "500",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "25px",
      cursor: "pointer",
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
    },
    edit: {
      bg: "transparent",
      color: "primary",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "underline",
      padding: "0",
    },
  },
  box: {
    paymentField: {
      bg: "background",
      padding: "12px",
      fontSize: "1.1em",
      borderRadius: "5px",
      marginBottom: "20px",
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
    termsLink: {
      textDecoration: "none",
      color: "medusa100",
    },
    confirmationHeading: {
      lineHeight: "1.8em",
    },
    confirmationText: {
      fontSize: "0.8em",
      lineHeight: "1.5em",
      fontWeight: "300",
    },
    subheading: {
      fontSize: "1.1em",
      fontWeight: 550,
      color: "black",
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
    field: {
      border: "2px solid background",
      "::placeholder": {
        color: "placeholder",
      },
      ":-ms-input-placeholder": {
        color: "placeholder",
      },
      "::-ms-input-placeholder": {
        color: "placeholder",
      },
      backgroundColor: "background",
      transition: "all .2s linear",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      background: "ui",
    },
  },
}

export default theme
