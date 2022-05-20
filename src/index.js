import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

const root = createRoot(document.getElementById("root"));

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

root.render(
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>
);
