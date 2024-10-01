import React, { useState, lazy, Suspense } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Collapse, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, Route, Routes } from 'react-router-dom';
import styles from './Styles/App.module.css'

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
const PresupDetPie = lazy(() => import("./pages/Tablas/PresupDetPie/index.jsx"));
const PresupConfTipo = lazy(() => import("./pages/Tablas/PresupConfTipo/index.jsx"));
const OTCondPago = lazy(() => import("./pages/Tablas/OTCondPago/index.jsx"));
const Presupuesto = lazy(() => import("./pages/Presupuesto/index.jsx"));
const PresupMuestra = lazy(() =>
	import("./pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx")
);
const OTMovimiento = lazy(() => import("./pages/OrdenTrabajo/OTMovimiento/index.jsx"));
const ListaPrecios = lazy(() => import("./pages/ListaPrecios/index.jsx"));
const MovStockPant = lazy(() => import("./pages/MovStock/MovStockPant.jsx"));
const Inventario = lazy(() => import("./pages/MovStock/Inventario/index.jsx"));
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
const App = () => {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openSubMenuStock, setOpenSubMenuStock] = useState(false);
  const [openSubMenuTablas, setOpenSubMenuTablas] = useState(false);
  const [openSubMenuTGenerales, setOpenSubMenuTGenerales] = useState(false);
  const [openSubMenuTPresupuesto, setOpenSubMenuTPresupuesto] = useState(false);
  const [openSubMenuTOT, setOpenSubMenuTOT] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); 
  const navigate = useNavigate(); // Hook para manejar la navegación

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleSubMenuClick = () => {
    setOpenSubMenu(!openSubMenu);
  };
  const handleSubMenuClickStock = () => {
    setOpenSubMenuStock(!openSubMenuStock);
  };
  const handleSubMenuClickTablas = () => {
    setOpenSubMenuTablas(!openSubMenuTablas);
  };
  const handleSubMenuTGenerales = () => {
    setOpenSubMenuTGenerales(!openSubMenuTGenerales);
  };
  const handleSubMenuTPresupuesto = () => {
    setOpenSubMenuTPresupuesto(!openSubMenuTPresupuesto);
  };

  const handleSubMenuTOT = () => {
    setOpenSubMenuTOT(!openSubMenuTOT);
  };
  const handleNavigation = (path, index) => {
    setSelectedIndex(index);
    navigate(path); // Navega a la ruta especificada
    setOpen(false); // Cierra el menú después de la navegación
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Mi Aplicación
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem   className={`${styles.menuItem} ${selectedIndex === 0 ? styles.selected : ''}`}  
            onClick={() => handleNavigation('/')}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem   className={`${styles.menuItem} ${selectedIndex === 1 ? styles.selected : ''}`}  
            onClick={handleSubMenuClick}>
              <ListItemText primary="Presup Lista OT" />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem  sx={{ pl: 4 }}   
                className={`${styles.menuItem} ${selectedIndex === 2 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/ListaPrecios')}>
                  <ListItemText primary="Lista de Precios" />
                </ListItem>
                <ListItem     sx={{ pl: 4 }}   
                className={`${styles.menuItem} ${selectedIndex === 3 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/Presupuesto')}>
                  <ListItemText primary="Presupuesto" />
                </ListItem>
                <ListItem    sx={{ pl: 4 }}   
                className={`${styles.menuItem} ${selectedIndex === 4 ? styles.selected : ''}`}  
                onClick={() => handleNavigation('/PresupMuestra')}>
                  <ListItemText primary="Muestra Presupuesto" />
                </ListItem>
                <ListItem     sx={{ pl: 4 }} 
                  className={`${styles.menuItem} ${selectedIndex === 5 ? styles.selected : ''}`}  
                  onClick={() => handleNavigation('/OTMovimiento')}>
                  <ListItemText primary="Movimiento OT" />
                </ListItem>
                </List>
            </Collapse>
{/* comienza stock */}
            <ListItem   className={`${styles.menuItem} ${selectedIndex === 1 ? styles.selected : ''}`}  
             onClick={handleSubMenuClickStock}>
              <ListItemText primary="Stock" />
              {openSubMenuStock ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenuStock} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem  sx={{ pl: 4 }}   
                className={`${styles.menuItem} ${selectedIndex === 2 ? styles.selected : ''}`}  
                onClick={() => handleNavigation('/MovStockPant')}>
                  <ListItemText primary="Movimiento Stock" />
                </ListItem>
                <ListItem     sx={{ pl: 4 }}   
                className={`${styles.menuItem} ${selectedIndex === 3 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/Inventario')}>
                  <ListItemText primary="Inventario" />
                </ListItem>
                </List>
            </Collapse>


            {/* comienza tablas */}
            <ListItem   className={`${styles.menuItem} ${selectedIndex === 1 ? styles.selected : ''}`}  
             onClick={handleSubMenuClickTablas}>
              <ListItemText primary="Tablas" />
              {openSubMenuTablas ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
           
               {/* Tablas Generales principal */}
            <Collapse in={openSubMenuTablas} timeout="auto" unmountOnExit>
                <ListItem
                 sx={{ pl: 4 }}
                  onClick={handleSubMenuTGenerales} // Controla el segundo submenú
                  className={`${styles.menuItem} ${selectedIndex === 2 ? styles.selected : ''}`} // Aplica estilos
                >
                  <ListItemText primary="Generales" />
                  {openSubMenuTGenerales ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

               

                <Collapse in={openSubMenuTGenerales} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem  sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 4 ? styles.selected : ''}`}  
                onClick={() => handleNavigation('/Proveedores')}>
                  <ListItemText primary="Proveedores" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 5 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/Clientes')}>
                  <ListItemText primary="Clientes" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 6 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/StkMonedas')}>
                  <ListItemText primary="Monedas" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 7 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/Transporte')}>
                  <ListItemText primary="Transporte" />
                </ListItem>
                </List>
                </Collapse>

 {/* termina tablas generales */}


{/* Tablas Presupuesto  */}
                <ListItem
                 sx={{ pl: 4 }}
                  onClick={handleSubMenuTPresupuesto} // Controla el segundo submenú
                  className={`${styles.menuItem} ${selectedIndex === 3 ? styles.selected : ''}`} // Aplica estilos
                >
                  <ListItemText primary="Presupuesto" />
                  {openSubMenuTPresupuesto ? <ExpandLess /> : <ExpandMore />}
                </ListItem>


{/* Tablas Presupuesto items */}
          <Collapse in={openSubMenuTPresupuesto} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem  sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 8 ? styles.selected : ''}`}  
                onClick={() => handleNavigation('/StkGrupos')}>
                  <ListItemText primary="Grupos" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 9 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/StkRubros')}>
                  <ListItemText primary="Rubros" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 10 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/StkItems')}>
                  <ListItemText primary="Items" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 11 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/StkUnMed')}>
                  <ListItemText primary="Unidad de Medidas" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 12 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/UbFisica')}>
                  <ListItemText primary="Ubicación Física" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 13 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/PresupDetPie')}>
                  <ListItemText primary="Pie Presupuesto" />
                </ListItem>
                <ListItem     sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 14 ? styles.selected : ''}`} 
                 onClick={() => handleNavigation('/PresupConfTipo')}>
                  <ListItemText primary="Tipo Confección" />
                </ListItem>
               
                </List>
                </Collapse>
                {/* </Collapse> */}
            {/* termina tablas Presupuesto */}


{/* Tablas OT  */}
          <ListItem
                 sx={{ pl: 4 }}
                  onClick={handleSubMenuTOT} // Controla el segundo submenú
                  className={`${styles.menuItem} ${selectedIndex === 4 ? styles.selected : ''}`} // Aplica estilos
                >
                  <ListItemText primary="Orden de Trabajo" />
                  {openSubMenuTOT ? <ExpandLess /> : <ExpandMore />}
                </ListItem>


{/* Tablas OT items */}
          <Collapse in={openSubMenuTOT} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem  sx={{ pl: 8 }}   
                className={`${styles.menuItem} ${selectedIndex === 15 ? styles.selected : ''}`}  
                onClick={() => handleNavigation('/OTCondPago')}>
                  <ListItemText primary="Condiciones de Pago" />
                </ListItem>
                    
                </List>
                </Collapse>
            {/* termina tablas OT */}

            
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Suspense para cargar los componentes lazy */}
	  <StaticContexto>
	  <PresupPant>
					<DatosTablas>
						<OrdenTrabajo>
							<CtaCteContext>
      <Suspense fallback={<div>Cargando...</div>}>
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


          <Route path="/OTCondPago" element={<OTCondPago />} />

        </Routes>
      </Suspense>
	  </CtaCteContext>
						</OrdenTrabajo>
					</DatosTablas>
				</PresupPant>
				</StaticContexto>
    </div>
  );
};

export default App;
