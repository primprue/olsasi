import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const OTCondPago = lazy(() => import("./pages/Tablas/OTCondPago"));
const BackupDiario = lazy(() => import("./pages/ProcInternos/BackupDiario"));
// const PresupPant = lazy(() => import("./context/PresupPant.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto"));
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo"));
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios"));
const ModificaPrecios = lazy(() =>
	import("./pages/ListaPrecios/ModificaPrecios")
);
const PresupMuestra = lazy(() =>
	import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra")
);
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() =>
	import("./pages/CtasCtes/Tablas/ParamComp/index.jsx")
);

import { StaticContexto } from "./context/StaticContext";
import { DatosTablas } from "./context/TablasContext";
import { OrdenTrabajo } from "./context/OrdTrabajo.jsx";
import { PresupPant } from "./context/PresupPant";
import { CtaCteContext } from "./context/CtasCtesContext.jsx";
export default function App() {
	return (
		<StaticContexto>
			<div>
				{/* className={DivPpal.multi_bg_example} */}
				<Header />
				<PresupPant>
					<DatosTablas>
						<OrdenTrabajo>
							<CtaCteContext>
								<Routes>
									<Route
										path="/"
										element={
											<Suspense fallback={<>...</>}>
												<Home />
											</Suspense>
										}
									/>
									<Route
										path="/PresupPant"
										element={
											<Suspense fallback={<>...</>}>
												<Presupuesto />
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
										path="/OTMovimiento"
										element={
											<Suspense fallback={<>...</>}>
												<OTMovimiento />
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
										path="/PresupDetPie"
										element={
											<Suspense fallback={<>...</>}>
												<PresupDetPie />
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
									<Route
										path="/BackupDiario"
										element={
											<Suspense fallback={<>...</>}>
												<BackupDiario />
											</Suspense>
										}
									/>
									<Route
										path="/CtasCtes"
										element={
											<Suspense fallback={<>...</>}>
												<CtasCtes />
											</Suspense>
										}
									/>
									<Route
										path="/ParamComp"
										element={
											<Suspense fallback={<>...</>}>
												<ParamComp />
											</Suspense>
										}
									/>
									<Route
										path="/OTCondPago"
										element={
											<Suspense fallback={<>...</>}>
												<OTCondPago />
											</Suspense>
										}
									/>
									<Route
										path="*"
										element={
											<div>
												<h2>404 - Página no encontrada</h2>
											</div>
										}
									/>
								</Routes>
							</CtaCteContext>
						</OrdenTrabajo>
					</DatosTablas>
				</PresupPant>
			</div>
		</StaticContexto>
	);
}
