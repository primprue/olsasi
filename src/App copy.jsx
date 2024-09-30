import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import { Suspense } from "react";
import { lazy } from "react";
//lazy es para que no se caguen componentes no llamados
// const Home = lazy(() => import("./components/Home/index"));
import Home from "./components/Home/index";
import DivPpal from "../src/Styles/Divindex.module.css";
const Proveedores = lazy(() => import("./pages/Tablas/Proveedores/index.jsx"));
const Clientes = lazy(() => import("./pages/Tablas/Clientes/index.jsx"));
const StkMonedas = lazy(() => import("./pages/Tablas/Monedas/index.jsx"));
const Transporte = lazy(() => import("./pages/Tablas/Transporte/index.jsx"));
const StkGrupos = lazy(() => import("./pages/Tablas/StkGrupos/index.jsx"));
const StkRubros = lazy(() => import("./pages/Tablas/StkRubros/index.jsx"));
const StkItems = lazy(() => import("./pages/Tablas/StkItems/index.jsx"));
const StkUnMed = lazy(() => import("./pages/Tablas/UnidadMedidas/index.jsx"));
const UbFisica = lazy(() => import("./pages/Tablas/UbicacionFisica/index.jsx"));
const PresupDetPie = lazy(() => import("./pages/Tablas/PresupDetPie/index.jsx"));
const PresupConfTipo = lazy(() => import("./pages/Tablas/PresupConfTipo/index.jsx"));
const OTCondPago = lazy(() => import("./pages/Tablas/OTCondPago/index.jsx"));
const BackupDiario = lazy(() => import("./pages/ProcInternos/BackupDiario.jsx"));

// const PresupPant = lazy(() => import("./context/PresupPant.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo.jsx"));
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
const ModificaPrecios = lazy(() =>
	import("./pages/ListaPrecios/ModificaPrecios.jsx")
);
const PresupMuestra = lazy(() =>
	import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx")
);
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const Inventario = lazy(() => import("./pages/MovStock/Inventario/index.jsx"));
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() =>
	import("./pages/CtasCtes/Tablas/ParamComp/index.jsx")
);

import { StaticContexto } from "./context/StaticContext.jsx";
import { DatosTablas } from "./context/TablasContext.jsx";
import { OrdenTrabajo } from "./context/OrdTrabajo.jsx";
import { PresupPant } from "./context/PresupPant.jsx";
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
										path="/Inventario"
										element={
											<Suspense fallback={<>...</>}>
												<Inventario />
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
