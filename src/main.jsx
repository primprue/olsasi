import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify"; //para los mensajes de error o exito
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import './index.css'; // <-- esto es esencial

import App from "./App.jsx";
import { StaticContexto } from "./context/StaticContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter >
			<StaticContexto>
				<App />
			</StaticContexto>
		</BrowserRouter>
		<ToastContainer />
	</React.StrictMode>
);


