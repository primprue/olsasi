import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Sidebar from './Sidebar';
import { lazy, Suspense, use } from 'react';
import StaticContext from './context/StaticContext.jsx';
import { PresupPant } from './context/PresupPant.jsx';
import { DatosTablas } from './context/TablasContext.jsx';
import { OrdenTrabajo } from './context/OrdTrabajo.jsx';
import { CtaCteContext } from './context/CtasCtesContext.jsx';

const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const PresupMuestra = lazy(() => import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx"));
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo.jsx"));
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));


const Proveedores = lazy(() => import("./pages/Tablas/Proveedores/index.jsx"));
const Clientes = lazy(() => import("./pages/Tablas/Clientes/index.jsx"));
const StkMonedas = lazy(() => import("./pages/Tablas/Monedas/index.jsx"));
const Transporte = lazy(() => import("./pages/Tablas/Transporte/index.jsx"));
const StkGrupos = lazy(() => import("./pages/Tablas/StkGrupos/index.jsx"));
const StkRubros = lazy(() => import("./pages/Tablas/StkRubros/index.jsx"));
const StkItems = lazy(() => import("./pages/Tablas/StkItems/index.jsx"));
const StkUnMed = lazy(() => import("./pages/Tablas/UnidadMedidas/index.jsx"));
const UbFisica = lazy(() => import("./pages/Tablas/UbicacionFisica/index.jsx"));
const PBRubros = lazy(() => import("./pages/Tablas/PBRubros/index.jsx"));
const PresupDetPie = lazy(() => import("./pages/Tablas/PresupDetPie/index.jsx"));
const PresupConfTipo = lazy(() => import("./pages/Tablas/PresupConfTipo/index.jsx"));
const OTCondPago = lazy(() => import("./pages/Tablas/OTCondPago/index.jsx"));
const OTDatos = lazy(() => import("./pages/Tablas/OTDatos/index.jsx"));
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const Inventario = lazy(() => import("./pages/MovStock/Inventario/index.jsx"));
const Reparacion = lazy(() => import("./pages/Reparacion/index.jsx"));
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() => import("./pages/CtasCtes/Tablas/ParamComp/index.jsx"));

function App() {
    const { valor } = use(StaticContext);
    return (
        <>
            <AppBar position="static" sx={{ borderRadius: 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 2, ml: 5 }}>
                        Sistema Integrado
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 2, ml: 5 }}>
                        {valor}
                    </Typography>
                    <Box>
                        <Typography variant="body1">
                            {new Date().toLocaleDateString('es-AR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>
                    </Box>
                    <Sidebar />
                </Toolbar>
            </AppBar>

            <PresupPant>
                <DatosTablas>
                    <OrdenTrabajo>
                        <CtaCteContext>
                            <Box sx={{ px: 8, py: 4 }}>
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <Routes>
                                        <Route path="/" element={<div>Bienvenido a la App</div>} />
                                        <Route path="/ListaPrecios" element={<ListaPrecios />} />
                                        <Route path="/presupuesto/Presupuesto" element={<Presupuesto />} />
                                        <Route path="/presupuesto/PresupMuestra" element={<PresupMuestra />} />
                                        <Route path="/otrabajo/OTrabajo" element={<OTrabajo />} />
                                        <Route path="/otrabajo/OTMovimiento" element={<OTMovimiento />} />
                                        <Route path="/tablas/Proveedores" element={<Proveedores />} />
                                        <Route path="/tablas/Clientes" element={<Clientes />} />
                                        <Route path="/tablas/StkMonedas" element={<StkMonedas />} />
                                        <Route path="/tablas/Transporte" element={<Transporte />} />
                                        <Route path="/tablas/StkGrupos" element={<StkGrupos />} />
                                        <Route path="/tablas/StkRubros" element={<StkRubros />} />
                                        <Route path="/tablas/StkItems" element={<StkItems />} />
                                        <Route path="/tablas/UnidadMedidas" element={<StkUnMed />} />
                                        <Route path="/tablas/UbicacionFisica" element={<UbFisica />} />
                                        <Route path="/tablas/PBRubros" element={<PBRubros />} />
                                        <Route path="/tablas/PresupDetPie" element={<PresupDetPie />} />
                                        <Route path="/tablas/PresupConfTipo" element={<PresupConfTipo />} />
                                        <Route path="/tablas/OTCondPago" element={<OTCondPago />} />
                                        <Route path="/tablas/OTDatos" element={<OTDatos />} />
                                        <Route path="/MovStock" element={<MovStockPant />} />
                                        <Route path="/Inventario" element={<Inventario />} />
                                        <Route path="/Reparacion" element={<Reparacion />} />
                                        <Route path="/CtasCtes" element={<CtasCtes />} />
                                        <Route path="/CtasCtes/ParamComp" element={<ParamComp />} />



                                        {/* <Route path="/logout" element={<div>Sesión cerrada</div>} /> */}
                                    </Routes>
                                </Suspense>
                            </Box>
                        </CtaCteContext>
                    </OrdenTrabajo>
                </DatosTablas>
            </PresupPant>
        </>
    );
}

export default App;
