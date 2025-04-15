import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify"; //para los mensajes de error o exito
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

import "tailwindcss";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <BrowserRouter basename="/toolpad"> */}
		<BrowserRouter >

			<App />
		</BrowserRouter>
		<ToastContainer />
	</React.StrictMode>
);
