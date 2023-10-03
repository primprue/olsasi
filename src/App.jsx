import { Route, Routes } from "react-router-dom";
// import Layout from "./pages/Layout";
import Header from "/src/components/Header/Header.jsx";
// , BrowserRouter as Router,
import React from "react";
import Home from "./components/Home/index";
// import StkMonedas from "./pages/Monedas/StkMonedas.jsx";
import Proveedores from "./pages/Tablas/Proveedores/index.jsx";
import StkMonedas from "./pages/Tablas/Monedas";
import Clientes from "./pages/Tablas/Clientes/Clientes.jsx";
import PresupPant from "./pages/Presupuesto/PresupPant";
import { StaticContexto } from "./context/StaticContext";
import { DatosTablas } from "./context/TablasContext";
export default function App() {
	return (
		<StaticContexto>
			<div className="container">
				<Header />
				{/* <Route path="/StkMonedas" component={StkMonedas} /> */}
				<DatosTablas>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Home" element={<Home />} />
						<Route path="/Proveedores" element={<Proveedores />} />
						<Route path="/StkMonedas" element={<StkMonedas />} />
						<Route path="/Clientes" element={Clientes} />
						<Route path="/PresupPant" element={<PresupPant />} />
					</Routes>
				</DatosTablas>
			</div>
		</StaticContexto>
	);
}
