import { Route, Routes } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Header from "/src/components/Header/Header.jsx";
import Header from "./components/Header/Header.jsx";
// , BrowserRouter as Router,
import React from "react";
import Home from "./components/Home/index";
import Proveedores from "./pages/Tablas/Proveedores/index.jsx";
import StkMonedas from "./pages/Tablas/Monedas";
import Clientes from "./pages/Tablas/Clientes";
import Transporte from "./pages/Tablas/Transporte";
import StkGrupos from "./pages/Tablas/StkGrupos";
import StkRubros from "./pages/Tablas/StkRubros";
import StkItems from "./pages/Tablas/StkItems/index.jsx";
import PresupPant from "./pages/Presupuesto/PresupPant";
import { StaticContexto } from "./context/StaticContext";
import { DatosTablas } from "./context/TablasContext";
import ListaPrecios from "./pages/ListaPrecios/ListaPrecios";
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
						<Route path="/Clientes" element={<Clientes />} />
						<Route path="/Transporte" element={<Transporte />} />
						<Route path="/StkGrupos" element={<StkGrupos />} />
						<Route path="/StkRubros" element={<StkRubros />} />
						<Route path="/StkItems" element={<StkItems />} />
						<Route path="/PresupPant" element={<PresupPant />} />
						<Route path="/ListaPrecios" element={<ListaPrecios />} />
					</Routes>
				</DatosTablas>
			</div>
		</StaticContexto>
	);
}
