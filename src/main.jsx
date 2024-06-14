import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify"; //para los mensajes de error o exito
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { StyledEngineProvider } from "@mui/material/styles";
let theme = createTheme({});
theme = createTheme(theme, {
	// Custom colors created with augmentColor go here
	palette: {
		primary: {
			main: "#03023aea",
			contrastText: "#08eec8f0",
			light: "#16151622",
		},
		secondary: {
			main: "#1564f7",
			light: "#F5EBFF",
			contrastText: "#47008F",
		},
	},
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <StyledEngineProvider injectFirst> */}
			<ThemeProvider theme={theme}>
				<App />
				{/* </StyledEngineProvider> */}
			</ThemeProvider>
		</BrowserRouter>
		<ToastContainer />
	</React.StrictMode>
);
