import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#ffffff";
const arcOrange = "#55acee";

export default createMuiTheme({
  palette: {
    common: {
      Blue: `${arcBlue}`,
      Orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
  },
  overrides: {
    MuiBox: {
      root: {},
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
