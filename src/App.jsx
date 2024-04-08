import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Suspense } from "react";
import { lazy } from "react";
//lazy es para que no se caguen componentes no llamados
// const Home = lazy(() => import("./components/Home/index"));
import Home from "./components/Home/index";
import DivPpal from "../src/Styles/Divindex.module.css";
const Proveedores = lazy(() => import("./pages/Tablas/Proveedores"));
const Clientes = lazy(() => import("./pages/Tablas/Clientes"));
const StkMonedas = lazy(() => import("./pages/Tablas/Monedas"));
const Transporte = lazy(() => import("./pages/Tablas/Transporte"));
const StkGrupos = lazy(() => import("./pages/Tablas/StkGrupos"));
const StkRubros = lazy(() => import("./pages/Tablas/StkRubros"));
const StkItems = lazy(() => import("./pages/Tablas/StkItems"));
const StkUnMed = lazy(() => import("./pages/Tablas/UnidadMedidas"));
const UbFisica = lazy(() => import("./pages/Tablas/UbicacionFisica"));
const PresupDetPie = lazy(() => import("./pages/Tablas/PresupDetPie"));
const PresupConfTipo = lazy(() => import("./pages/Tablas/PresupConfTipo"));
const PresupPant = lazy(() => import("./pages/Presupuesto/PresupPant"));
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios"));
const ModificaPrecios = lazy(() =>
	import("./pages/ListaPrecios/ModificaPrecios")
);
const PresupMuestra = lazy(() =>
	import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra")
);
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant"));
import { StaticContexto } from "./context/StaticContext";
import { DatosTablas } from "./context/TablasContext";

export default function App() {
	return (
		<StaticContexto>
			<div className="DivPpal.multi_bg_example">
				<Header />
				<DatosTablas>
					<Routes>
						<Route
							path="/"
							element={
								<Suspense fallback={<>...</>}>
									<Home />{" "}
								</Suspense>
							}
						/>
						<Route
							path="/Home"
							element={
								<Suspense fallback={<>...</>}>
									<Home />{" "}
								</Suspense>
							}
						/>
						<Route
							path="/PresupDetPie"
							element={
								<Suspense fallback={<>...</>}>
									<PresupDetPie />
								</Suspense>
							}
						/>
						<Route
							path="/PresupPant"
							element={
								<Suspense fallback={<>...</>}>
									<PresupPant />
								</Suspense>
							}
						/>
						<Route
							path="/PresupMuestra"
							element={
								<Suspense fallback={<>...</>}>
									<PresupMuestra />
								</Suspense>
							}
						/>
						<Route
							path="/OTrabajo"
							element={
								<Suspense fallback={<>...</>}>
									<OTrabajo />
								</Suspense>
							}
						/>

						<Route
							path="/ListaPrecios"
							element={
								<Suspense fallback={<>...</>}>
									<ListaPrecios />
								</Suspense>
							}
						/>
						<Route
							path="/ModificaPrecios"
							element={
								<Suspense fallback={<>...</>}>
									<ModificaPrecios />
								</Suspense>
							}
						/>
						<Route
							path="/MovStockPant"
							element={
								<Suspense fallback={<>...</>}>
									<MovStockPant />
								</Suspense>
							}
						/>
						<Route
							path="/Proveedores"
							element={
								<Suspense fallback={<>...</>}>
									<Proveedores />
								</Suspense>
							}
						/>
						<Route
							path="/Clientes"
							element={
								<Suspense fallback={<>...</>}>
									<Clientes />
								</Suspense>
							}
						/>
						<Route
							path="/StkMonedas"
							element={
								<Suspense fallback={<>...</>}>
									<StkMonedas />
								</Suspense>
							}
						/>
						<Route
							path="/Transporte"
							element={
								<Suspense fallback={<>...</>}>
									<Transporte />
								</Suspense>
							}
						/>
						<Route
							path="/StkGrupos"
							element={
								<Suspense fallback={<>...</>}>
									<StkGrupos />
								</Suspense>
							}
						/>
						<Route
							path="/StkRubros"
							element={
								<Suspense fallback={<>...</>}>
									<StkRubros />
								</Suspense>
							}
						/>
						<Route
							path="/StkItems"
							element={
								<Suspense fallback={<>...</>}>
									<StkItems />
								</Suspense>
							}
						/>
						<Route
							path="/StkUnMed"
							element={
								<Suspense fallback={<>...</>}>
									<StkUnMed />
								</Suspense>
							}
						/>
						<Route
							path="/UbFisica"
							element={
								<Suspense fallback={<>...</>}>
									<UbFisica />
								</Suspense>
							}
						/>
						<Route
							path="/PresupConfTipo"
							element={
								<Suspense fallback={<>...</>}>
									<PresupConfTipo />
								</Suspense>
							}
						/>
					</Routes>
				</DatosTablas>
			</div>
		</StaticContexto>
	);
}
