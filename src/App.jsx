import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import TableChartIcon from "@mui/icons-material/TableChart";
import PriceChangeTwoToneIcon from '@mui/icons-material/PriceChangeTwoTone';
import ViewListTwoToneIcon from '@mui/icons-material/ViewListTwoTone';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';
import PreviewSharpIcon from '@mui/icons-material/PreviewSharp';
import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import PatternSharpIcon from '@mui/icons-material/PatternSharp';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import { FcCalculator } from "react-icons/fc";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { StaticContexto } from "./context/StaticContext.jsx";
import { PresupPant } from "./context/PresupPant.jsx";
import { DatosTablas } from "./context/TablasContext.jsx";
import { OrdenTrabajo } from "./context/OrdTrabajo.jsx";
import { CtaCteContext } from "./context/CtasCtesContext.jsx";
import { Chip, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { Routes } from "react-router-dom";
import { Label } from "@mui/icons-material";

const { lazy, Suspense } = React;

// 📌 Importación dinámica de componentes
const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
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
const OTrabajo = lazy(() => import("./pages/OrdenTrabajo/OTrabajo.jsx"));
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const PresupMuestra = lazy(() => import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx"));
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const Inventario = lazy(() => import("./pages/MovStock/Inventario/index.jsx"));
const Reparacion = lazy(() => import("./pages/Reparacion/index.jsx"));
const CtasCtes = lazy(() => import("./pages/CtasCtes/index.jsx"));
const ParamComp = lazy(() => import("./pages/CtasCtes/Tablas/ParamComp/index.jsx"));

// 📌 Mapeo de rutas a componentes
const ROUTES_MAP = {
    "/ListaPrecios": ListaPrecios,
    "/tablas/proveedores": Proveedores,
    "/tablas/clientes": Clientes,
    "/tablas/monedas": StkMonedas,
    "/tablas/transporte": Transporte,
    "/tablas/grupos": StkGrupos,
    "/tablas/rubros": StkRubros,
    "/tablas/items": StkItems,
    "/tablas/unidad-medidas": StkUnMed,
    "/tablas/ubicacion-fisica": UbFisica,
    "/tablas/pb-rubros": PBRubros,
    "/tablas/presup-det-pie": PresupDetPie,
    "/tablas/presup-conf-tipo": PresupConfTipo,
    "/tablas/ot-cond-pago": OTCondPago,
    "/tablas/ot-datos": OTDatos,
    "/orden-trabajo/orden-trabajo": OTrabajo,
    "/orden-trabajo/otmovimiento": OTMovimiento,
    "/presupuesto": Presupuesto,
    "/PresupMuestra": PresupMuestra,
    "/mov-stock": MovStockPant,
    "/inventario": Inventario,
    "/reparacion": Reparacion,
    "/ctas-ctes": CtasCtes,
    "/ctas-ctes/param-comp": ParamComp,
};
const Branding = {
    logo: <img src="/favicon.png" alt="MUI logo" />,
    // logo: <img src="../public/favicon.png" alt="MUI logo" />,
    title: 'SitOLSA',
    homeUrl: '/toolpad/core/introduction',
}

// 📌 Menú de navegación con estructura jerárquica
const NAVIGATION = [

    { kind: "header", title: "Menú" },
    { segment: "ListaPrecios", title: "Lista de Precios", icon: <DashboardIcon /> },
    { kind: "header", title: "Presupuesto" },
    { segment: "presupuesto", title: "Presupuesto", icon: <CalculateSharpIcon /> },
    { segment: "PresupMuestra", title: "Muestra", icon: <PreviewSharpIcon /> },
    { kind: "divider" },
    { kind: "header", title: "Tablas" },
    {
        segment: "tablas",
        title: "Tablas",
        icon: <ViewListTwoToneIcon />,
        children: [
            { segment: "proveedores", title: "Proveedores" },
            { segment: "clientes", title: "Clientes" },
            { segment: "monedas", title: "Monedas" },
            { segment: "transporte", title: "Transporte" },
            { segment: "grupos", title: "Grupos" },
            { segment: "rubros", title: "Rubros" },
            { segment: "items", title: "Items" },
            { segment: "unidad-medidas", title: "Unidad Medidas" },
            { segment: "ubicacion-fisica", title: "Ubicación Física" },
            { segment: "pb-rubros", title: "PB Rubros" },
            { segment: "presup-det-pie", title: "Presupuesto Detalle Pie" },
            { segment: "presup-conf-tipo", title: "Presupuesto Config Tipo" },
            { segment: "ot-cond-pago", title: "OT Condiciones Pago" },
            { segment: "ot-datos", title: "OT Datos" },
        ],
    },
    { kind: "header", title: "Orden de Trabajo" },
    {
        segment: "orden-trabajo",
        title: "Orden de Trabajo",
        icon: <ViewListTwoToneIcon />,
        children: [
            { segment: "orden-trabajo", title: "Orden de Trabajo", icon: <ManageHistorySharpIcon /> },
            { segment: "otmovimiento", title: "OTrabajo Movimiento", icon: <ManageHistorySharpIcon /> },
        ],
    },

    // { segment: "orden-trabajo", title: "Orden de Trabajo", icon: <ManageHistorySharpIcon /> },
    // { segment: "otmovimiento", title: "OTrabajo Movimiento", icon: <ManageHistorySharpIcon /> },
    { segment: "mov-stock", title: "Movimientos de Stock", icon: <PatternSharpIcon /> },
    { segment: "inventario", title: "Inventario", icon: <InventorySharpIcon /> },
    { segment: "reparacion", title: "Reparación", icon: <ConstructionSharpIcon /> },
    { segment: "ctas-ctes", title: "Cuentas Corrientes", icon: <BadgeSharpIcon /> },
];
const TITLES_MAP = {
    "/ListaPrecios": "Lista de Precios",
    "/tablas/proveedores": "Proveedores",
    "/tablas/clientes": "Clientes",
    "/tablas/monedas": "Monedas",
    "/tablas/transporte": "Transporte",
    "/tablas/grupos": "Grupos",
    "/tablas/rubros": "Rubros",
    "/tablas/items": "Items",
    "/tablas/unidad-medidas": "Unidad deMedidas",
    "/tablas/ubicacion-fisica": "Ubicación Física",
    "/tablas/pb-rubros": "PreBalance Rubros",
    "/tablas/presup-det-pie": "Presupuesto : Detalle Pie ",
    "/tablas/presup-conf-tipo": "Presupuesto : Confección Tipo",
    "/tablas/ot-cond-pago": "Orden de Trabajo : Condiciones de Pago",
    "/tablas/ot-datos": "Orden de Trabajo : Datos a Pedir",
    "/orden-trabajo": "Orden de Trabajo",
    "/orden-trabajo/otmovimiento": "Orden de Trabajo : Movimiento",
    "/presupuesto": "Presupuesto",
    "/PresupMuestra": "Presupuesto : Muestra",
    "/mov-stock": "Movimientos de Stock",
    "/inventario": "Inventario",
    "/reparacion": "Reparacion",
    "/ctas-ctes": "Cuentas Corrientes",
    "/ctas-ctes/param-comp": "Parametros Comprobantes",
    // ... el resto de las rutas
};
const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});


function CustomAppTitle() {

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <img src="favicon.ico" />
            <Typography variant="h6" sx={{
                color: "#0062c4",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                // textTransform: "uppercase"

            }}>Sitema Integrado OLSA</Typography>
            {/* <Chip size="small" label="BETA" color="info" />
            <Tooltip title="Connected to production">
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip> */}
        </Stack>
    );
}


function ToolbarActionsSearch() {
    const today = new Date().toLocaleDateString();
    return (
        <Stack direction="row">
            <Typography variant="h6" sx={{
                color: "#0062c4",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                textTransform: "uppercase"

            }}>{today}</Typography>
        </Stack >
    );
}

function DashboardLayoutBasic(props) {
    const { window } = props;
    const demoWindow = window !== undefined ? window() : undefined;

    const navigate = useNavigate();
    const router = useDemoRouter("/");
    const [pageTitle, setPageTitle] = React.useState(TITLES_MAP[router.pathname] || "Página no encontrada");
    React.useEffect(() => {
        // Actualiza el título según la ruta actual
        setPageTitle(TITLES_MAP[router.pathname] || "Página no encontrada");
    }, [router.pathname]);
    // const location = useLocation();
    // const [pageTitle, setPageTitle] = React.useState(TITLES_MAP[location.pathname] || "Página no encontrada");
    // React.useEffect(() => {
    //     setPageTitle(TITLES_MAP[location.pathname] || "Página no encontrada");
    // }, [location.pathname]);


    return (
        // <AppProvider navigation={NAVIGATION} location={location} theme={demoTheme} branding={Branding} window={demoWindow}>

        <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} branding={Branding} window={demoWindow}>
            <StaticContexto>
                <PresupPant>
                    <DatosTablas>
                        <OrdenTrabajo>
                            <CtaCteContext>
                                <DashboardLayout slots={{
                                    appTitle: CustomAppTitle,
                                    toolbarActions: ToolbarActionsSearch,
                                }}>
                                    <Box sx={{ py: 1, textAlign: "center" }}>
                                        <Typography variant="h6">{pageTitle}</Typography>
                                    </Box>
                                    {/* <Suspense fallback={<Typography>Cargando...</Typography>}>
                                        {React.createElement(ROUTES_MAP[location.pathname] || (() => (
                                            <Box sx={{ py: 1, textAlign: "center" }}>
                                                <Typography>Página no encontrada: {location.pathname}</Typography>
                                            </Box>
                                        )))}
                                    </Suspense> */}
                                    <Suspense fallback={<Typography>Cargando...</Typography>}>
                                        {React.createElement(ROUTES_MAP[router.pathname] || (() => (
                                            <Box sx={{ py: 1, textAlign: "center" }}>
                                                <Typography>Página no encontrada: {router.pathname}</Typography>
                                            </Box>
                                        )))}
                                    </Suspense>
                                </DashboardLayout>
                            </CtaCteContext>

                        </OrdenTrabajo>
                    </DatosTablas>
                </PresupPant>
            </StaticContexto>
        </AppProvider>
    );
}

DashboardLayoutBasic.propTypes = {
    window: PropTypes.func,
};
// export default App;
export default DashboardLayoutBasic;


// // Obtiene el componente de la ruta actual
// const PageComponent = ROUTES_MAP[router.pathname] || (() => (
//     <Box sx={{ py: 1, textAlign: "center" }}>
//         <Typography>Página no encontrada: {router.pathname}</Typography>
//     </Box>
// ));
