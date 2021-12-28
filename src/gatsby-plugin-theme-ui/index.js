const theme = {
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  breakpoints: ["720px"],
  colors: {
    primary: "#111827",
    medusaGreen: "#56FBB1",
    medusa100: "#454B54",
    deepBlue: "#0A3149",
    ui: "#F7F7FA",
    cool: "#EEF0F5",
    background: "#F7F7FA",
    salmon: "#FF9B9B",
    placeholder: "#BBBBBB",
    grey: "#E5E7EB",
    darkGrey: "#6B7280",
  },
  cards: {
    accordionTrigger: {
      bg: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "375px",
      borderRadius: "8px",
      transition: "all .2s linear",
      fontFamily: "Inter",
      fontWeight: "600",
      px: "24px",
      py: "16px",
    },
    container: {
      bg: "white",
      width: "375px",
      px: "24px",
      py: "16px",
      height: "auto",
      borderRadius: "8px",
      justifyContent: "center",
      transition: "all .2s linear",
    },
  },
  buttons: {
    cta: {
      bg: "primary",
      color: "white",
      fontWeight: "500",
      fontSize: "14px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
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
      fontSize: "16px",
      fontWeight: "600",
    },
    summary: {
      py: ".1em",
      fontSize: "12px",
      color: "darkGrey",
      fontFamily: "Inter",
      fontWeight: 300,
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
      fontSize: "12px",
      fontWeight: 600,
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
      border: "1px solid grey",
      "::placeholder": {
        color: "darkGrey",
      },
      ":-ms-input-placeholder": {
        color: "darkGrey",
      },
      "::-ms-input-placeholder": {
        color: "darkGrey",
      },
      outline: "none",
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
};

export default theme;
