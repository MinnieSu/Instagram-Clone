import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";

// create an style object with a global key which changes the body selector
// we change the background color and text color in light mode and dark mode.
const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "000")(props),
      color: mode("gray.800", "whiteAplpha.900")(props),
    },
  }),
};

// Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// extend the theme
// pass the styles into extendTheme so that it can rewrite the color that ChakraProvider gives us, and then pass into our App
const theme = extendTheme({ config, styles });

export default theme;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
