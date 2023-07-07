import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  // Define your day theme properties
  palette: {
    type: "light",
    primary: {
      main: "#4A90E2", // Blue color
    },
    secondary: {
      main: "#F15C5C", // Red color
    },
  },
  // ...
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#4A90E2", // Blue color
    },
    secondary: {
      main: "#F15C5C", // Red color
    },
    // primary: {
    //   main: "#FFFFFF", // white color
    // },
    // secondary: {
    //   main: "#FF9800", // orange color (example)
    // },
  },
});

export { lightTheme, darkTheme };
