import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Sidebar from './Sidebar';
import { lazy, Suspense, use } from 'react';
import StaticContext from './context/StaticContext.jsx';
import { PresupPant } from './context/PresupPant.jsx';
import { DatosTablas } from './context/TablasContext.jsx';
import { OrdenTrabajo } from './context/OrdTrabajo.jsx';
import { CtaCteContext } from './context/CtasCtesContext.jsx';
const IndexTablas = lazy(() => import("./components/IndexTablas.jsx"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const PresupCargaJson = lazy(() => import("./pages/Presupuesto/CargaJson/PresupCargaJson.jsx"));
const GeneradorOT = lazy(() => import("./pages/OrdenTrabajo/LayoutOrdenTrabajo/GeneradorOT.jsx"));
const PresupMuestra = lazy(() => import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx"));
const ModificaPrecios = lazy(() => import("./pages/ListaPrecios/ModificaPrecios.jsx"));
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo.jsx"));
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));
const OTDatos = lazy(() => import("./pages/OrdenTrabajo/OTDatos/index.jsx"));

// import PBPorIVA from './pages/PreBalance/PBPorIVA/index.jsx';
// const PBRubros = lazy(() => import("./pages/PreBalance/PBRubros/index.jsx"));
// const PBSubRubros = lazy(() => import("./pages/PreBalance/PBSubRubros/index.jsx"));
// const PBItems = lazy(() => import("./pages/PreBalance/PBItems/index.jsx"));
// const PBComprobantes = lazy(() => import("./pages/PreBalance/PBComprobantes/index.jsx"));


const MovStockPant = lazy(() => import("./pages/Stock/MovStock/MovStockPant.jsx"));
// const Inventario = lazy(() => import("./pages/Stock/MovStock/Inventario/index.jsx"));
// const Inventario = lazy(() => import("./pages/Tablas/Inventario/index.jsx"));
const Reparacion = lazy(() => import("./pages/Reparacion/index.jsx"));
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() => import("./pages/CtasCtes/Tablas/ParamComp/index.jsx"));
const CajaIE = lazy(() => import("./pages/CajaIE/index.jsx"));
// const location = useLocation();



function App() {
    const { valor } = use(StaticContext);
    return (
        // <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <>
            <AppBar position="fixed" sx={{ borderRadius: 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 2, ml: 8 }}>
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
            <Toolbar disableGutters sx={{ backgroundColor: '#c2f7f79b', color: '#fff', minHeight: 30 }} />
            <PresupPant>
                <DatosTablas>
                    <OrdenTrabajo>
                        <CtaCteContext>
                            {/* <Box sx={{ px: 8, py: 2 }}> */}
                            <Box sx={{ px: 8, py: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <Routes>
                                        <Route path="/" element={<div>Bienvenido a la App</div>} />
                                        <Route path="/ListaPrecios" element={<ListaPrecios />} />
                                        <Route path="/presupuesto/Presupuesto" element={<Presupuesto />} />
                                        <Route path="/presupuesto/PresupMuestra" element={<PresupMuestra />} />
                                        <Route path="/presupuesto/PresupCargaJson" element={<PresupCargaJson />} />
                                        <Route path="OrdenTrabajo/GeneradorOT" element={<GeneradorOT />} />
                                        <Route path="/ListaPrecios/ModificaPrecios" element={<ModificaPrecios />} />
                                        <Route path="/otrabajo/OTrabajo" element={<OTrabajo />} />
                                        <Route path="/otrabajo/OTMovimiento" element={<OTMovimiento />} />
                                        {/* <Route path="/tablas/Proveedores" element={<Proveedores />} /> */}
                                        {/* <Route path="/tablas/StkMonedas" element={<StkMonedas />} /> */}
                                        {/* a todos los que tienen /tablas le cambio el nombre de la ruta y el path
                                    element={<StkItems />} por element={<IndexTablas rutaRelativa="StkItems" />} */}
                                        <Route path="/tablas/Proveedores" element={<IndexTablas rutaRelativa="Proveedores" />} />
                                        <Route path="/tablas/Clientes" element={<IndexTablas rutaRelativa="Clientes" />} />
                                        <Route path="/tablas/StkMonedas" element={<IndexTablas rutaRelativa="Monedas" />} />
                                        <Route path="/tablas/Transporte" element={<IndexTablas rutaRelativa="Transporte" />} />
                                        <Route path="/tablas/PorIVA" element={<IndexTablas rutaRelativa="PorIVA" />} />
                                        <Route path="/tablas/StkGrupos" element={<IndexTablas rutaRelativa="StkGrupos" />} />
                                        <Route path="/tablas/StkRubros" element={<IndexTablas rutaRelativa="StkRubros" />} />
                                        <Route path="/tablas/StkItems" element={<IndexTablas rutaRelativa="StkItems" />} />
                                        <Route path="/tablas/UnidadMedidas" element={<IndexTablas rutaRelativa="StkUnMed" />} />
                                        <Route path="/tablas/UbicacionFisica" element={<IndexTablas rutaRelativa="UbFisica" />} />
                                        <Route path="/tablas/PresupDetPie" element={<IndexTablas rutaRelativa="PresupDetPie" />} />
                                        <Route path="/tablas/PresupConfTipo" element={<IndexTablas rutaRelativa="PresupConfTipo" />} />
                                        <Route path="/tablas/PresupCalExp" element={<IndexTablas rutaRelativa="PresupCalExp" />} />
                                        <Route path="/tablas/OTCondPago" element={<IndexTablas rutaRelativa="OTCondPago" />} />
                                        <Route path="/tablas/PBRubros" element={<IndexTablas rutaRelativa="PBRubros" />} />
                                        <Route path="/tablas/PBSubRubros" element={<IndexTablas rutaRelativa="PBSubRubros" />} />
                                        <Route path="/tablas/PBItems" element={<IndexTablas rutaRelativa="PBItems" />} />
                                        <Route path="/tablas/PBComprobantes" element={<IndexTablas rutaRelativa="PBComprobantes" />} />
                                        <Route path="/tablas/Bancos" element={<IndexTablas rutaRelativa="Bancos" />} />
                                        <Route path="/tablas/Cheques" element={<IndexTablas rutaRelativa="Cheques" />} />



                                        <Route path="/tablas/OTDatos" element={<OTDatos />} />
                                        <Route path="/CajaIE" element={<CajaIE />} />
                                        <Route path="/MovStock" element={<MovStockPant />} />
                                        <Route path="/Inventario" element={<IndexTablas rutaRelativa="Inventario" />} />
                                        <Route path="/Reparacion" element={<Reparacion />} />
                                        <Route path="/CtasCtes" element={<CtasCtes />} />
                                        <Route path="/CtasCtes/ParamComp" element={<ParamComp />} />
                                    </Routes>
                                </Suspense>
                            </Box>
                        </CtaCteContext>
                    </OrdenTrabajo>
                </DatosTablas>
            </PresupPant >
            {/* // </Box> */}
        </>
    );
}

export default App;
