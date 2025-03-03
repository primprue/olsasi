import React, { useState, lazy, Suspense } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Collapse, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, Route, Routes, Router } from 'react-router-dom';
import styles from './Styles/App.module.css'
import estilos from './Styles/Header.module.css'

// Lazy-loaded components
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
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo.jsx"));
const OTCondPago = lazy(() => import("./pages/Tablas/OTCondPago/index.jsx"));
const OTDatos = lazy(() => import("./pages/Tablas/OTDatos/index.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const PresupMuestra = lazy(() =>
  import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx")
);
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const Inventario = lazy(() => import("./pages/MovStock/Inventario/index.jsx"));
const Reparacion = lazy(() => import("./pages/Reparacion/index.jsx"))
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() =>
  import("./pages/CtasCtes/Tablas/ParamComp/index.jsx")
);

const Inicio = () => <div><h1>Inicio</h1></div>;
import { StaticContexto } from "./context/StaticContext.jsx";
import { DatosTablas } from "./context/TablasContext.jsx";
import { OrdenTrabajo } from "./context/OrdTrabajo.jsx";
import { PresupPant } from "./context/PresupPant.jsx";
import { CtaCteContext } from "./context/CtasCtesContext.jsx";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PBSubRubros from './pages/Tablas/PBSubRubros/index.jsx';
import MenuPresup from './components/comppropios/MenuPresup.jsx';


// Configuración personalizada de breakpoints
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1000,
      xl: 1200,
    },
  },
});




const App = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>


        <AppBar position="static" className={estilos.barraherr}>
          <Toolbar className={estilos.toolbar}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Mi Aplicación

            </Typography>

          </Toolbar>
        </AppBar>


        {/* Suspense para cargar los componentes lazy */}
        <StaticContexto>
          <PresupPant>
            <DatosTablas>
              <OrdenTrabajo>
                <CtaCteContext>
                  <Suspense fallback={<div>Cargando...</div>}>

                    <MenuPresup />
                    <Routes>

                      <Route path="/" element={<Inicio />} />
                      <Route path="/ListaPrecios" element={<ListaPrecios />} />
                      <Route path="/Presupuesto" element={<Presupuesto />} />
                      <Route path="/PresupMuestra" element={<PresupMuestra />} />
                      <Route path="/OTMovimiento" element={<OTMovimiento />} />
                      <Route path="/MovStockPant" element={<MovStockPant />} />
                      <Route path="/Inventario" element={<Inventario />} />
                      <Route path="/Proveedores" element={<Proveedores />} />
                      <Route path="/Clientes" element={<Clientes />} />
                      <Route path="/StkMonedas" element={<StkMonedas />} />
                      <Route path="/Transporte" element={<Transporte />} />

                      <Route path="/StkGrupos" element={<StkGrupos />} />
                      <Route path="/StkRubros" element={<StkRubros />} />
                      <Route path="/StkItems" element={<StkItems />} />
                      <Route path="/StkUnMed" element={<StkUnMed />} />
                      <Route path="/UbFisica" element={<UbFisica />} />
                      <Route path="/PresupDetPie" element={<PresupDetPie />} />
                      <Route path="/PresupConfTipo" element={<PresupConfTipo />} />

                      <Route path="/PBRubros" element={<PBRubros />} />
                      <Route path="/PBSubRubros" element={<PBSubRubros />} />

                      <Route path="/OTCondPago" element={<OTCondPago />} />
                      <Route path="/OTDatos" element={<OTDatos />} />
                      <Route path="/OTrabajo" element={<OTrabajo />} />
                      <Route path="/Reparacion" element={<Reparacion />} />
                    </Routes>
                  </Suspense>
                </CtaCteContext>
              </OrdenTrabajo>
            </DatosTablas>
          </PresupPant>
        </StaticContexto>

      </div>
    </ThemeProvider>
  );
};

export default App;
