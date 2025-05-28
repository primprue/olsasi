import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Divider, useMediaQuery, useTheme, Box } from '@mui/material';
import { Home as HomeIcon, Person as PersonIcon, Settings as SettingsIcon, Lock as LockIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { use, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';

import DashboardIcon from "@mui/icons-material/Dashboard";
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewListTwoToneIcon from '@mui/icons-material/ViewListTwoTone';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';
import PreviewSharpIcon from '@mui/icons-material/PreviewSharp';
import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import PatternSharpIcon from '@mui/icons-material/PatternSharp';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import VideoStableRoundedIcon from '@mui/icons-material/VideoStableRounded';
import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import StraightenTwoToneIcon from '@mui/icons-material/StraightenTwoTone';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import BalanceTwoToneIcon from '@mui/icons-material/BalanceTwoTone';
import PriceChangeTwoToneIcon from '@mui/icons-material/PriceChangeTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ChecklistRtlTwoToneIcon from '@mui/icons-material/ChecklistRtlTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import LowPriorityTwoToneIcon from '@mui/icons-material/LowPriorityTwoTone';
import ShopTwoSharpIcon from '@mui/icons-material/ShopTwoSharp';
import DeveloperBoardSharpIcon from '@mui/icons-material/DeveloperBoardSharp';
import PercentIcon from '@mui/icons-material/Percent';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BalanceIcon from '@mui/icons-material/Balance';
import BrightnessLowRoundedIcon from '@mui/icons-material/BrightnessLowRounded';
import BrightnessMediumRoundedIcon from '@mui/icons-material/BrightnessMediumRounded';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import { AppProvider } from "@toolpad/core/AppProvider";
import StaticContext from './context/StaticContext';


const drawerWidthExpanded = 240; // Ancho cuando el menú está expandido
const drawerWidthCollapsed = 70; // Ancho cuando el menú está colapsado

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon sx={{ fontSize: 40, color: '#03d403' }} />, path: '/' },
  { text: 'Lista de Precios', icon: <DashboardIcon sx={{ fontSize: 32, color: '#055af8' }} />, path: '/listaprecios' },
  {
    text: 'Presupuesto',
    icon: <BorderColorIcon sx={{ fontSize: 32, color: '#050463' }} />,
    children: [
      { text: 'Presupuesto', icon: <CalculateSharpIcon sx={{ fontSize: 32, color: '#f51808f4' }} />, path: '/presupuesto/Presupuesto' },
      { text: 'Muestra Presupuesto', icon: <PreviewSharpIcon sx={{ fontSize: 32, color: '#949e07df' }} />, path: '/presupuesto/PresupMuestra' },
      { text: 'Modifica Precios', icon: <CurrencyExchangeTwoToneIcon sx={{ fontSize: 32, color: '#8d07afd4' }} />, path: '/ListaPrecios/ModificaPrecios' },
      { text: 'Tabla Detalle Pie', icon: <ArrowCircleDownTwoToneIcon sx={{ fontSize: 32, color: '#050463' }} />, path: '/tablas/PresupDetPie' },
      { text: 'Tabla Config Tipo', icon: <ChecklistRtlTwoToneIcon sx={{ fontSize: 32, color: '#050463' }} />, path: '/tablas/PresupConfTipo' },
    ],
  },
  { text: 'Reparación', icon: <ConstructionSharpIcon sx={{ fontSize: 32, color: '#1d5f09' }} />, path: '/Reparacion' },
  { text: 'Movimiento Orden de Trabajo', icon: <ManageHistorySharpIcon sx={{ fontSize: 32, color: '#e61677' }} />, path: '/otrabajo/OTMovimiento' },
  {
    text: 'PreBalance',
    icon: <BalanceIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />,
    children: [
      { text: 'PreBalance Rubros', icon: <BrightnessLowRoundedIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />, path: '/Prebalance/PBRubros' },
      { text: 'PreBalance SubRubros', icon: <BrightnessMediumRoundedIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />, path: '/Prebalance/PBSubRubros' },
      { text: 'PreBalance Items', icon: <BrightnessHighRoundedIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />, path: '/Prebalance/PBItems' },
      { text: 'Comprobantes', icon: <BrightnessHighRoundedIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />, path: '/Prebalance/PBComprobantes' },
      { text: 'Porcentaje IVA', icon: <PercentIcon sx={{ fontSize: 32, color: '#07c2a9cc' }} />, path: '/Prebalance/PBPorIVA' },
    ],
  },

  {
    text: 'Tablas',
    icon: <DeveloperBoardSharpIcon sx={{ fontSize: 32, color: '#c52c11' }} />,
    children: [
      { text: 'Proveedores', icon: <GridOnIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/Proveedores' },
      { text: 'Clientes', icon: <GroupTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/Clientes' },
      { text: 'Monedas', icon: <PriceChangeTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/StkMonedas' },
      { text: 'Transporte', icon: <LocalShippingTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/Transporte' },
      { text: 'Grupos', icon: <VideoStableRoundedIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/StkGrupos' },
      { text: 'Rubros', icon: <ClassTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/StkRubros' },
      { text: 'Items', icon: <CategoryTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/StkItems' },
      { text: 'Unidad de Medidas', icon: <StraightenTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/UnidadMedidas' },
      { text: 'Ubicación Física', icon: <PlaceTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/UbicacionFisica' },
      // { text: 'PreBalance Rubros', icon: <BalanceTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/PBRubros' },

      // {
      //   text: 'PreBalance', icon: <BalanceTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />,
      //   children: [
      //   ],
      // },
      // { text: 'Presupuesto Detalle Pie', icon: <ArrowCircleDownTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/PresupDetPie' },
      // { text: 'Presupuesto Config Tipo', icon: <ChecklistRtlTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/PresupConfTipo' },
      { text: 'OT Condiciones Pago', icon: <LowPriorityTwoToneIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/OTCondPago' },
      { text: 'OT Otros Datos', icon: <ShopTwoSharpIcon sx={{ fontSize: 32, color: '#c52c11' }} />, path: '/tablas/OTDatos' },
    ],
  },
  { text: 'Movimiento Stock', icon: <PatternSharpIcon sx={{ fontSize: 32, color: '#f86605' }} />, path: '/MovStock' },
  { text: 'Inventario', icon: <InventorySharpIcon sx={{ fontSize: 32, color: '#7c0abe' }} />, path: '/Inventario' },

  {
    text: 'Cuentas Corrientes',
    icon: <SettingsIcon sx={{ fontSize: 32, color: '#f8d405' }} />,
    children: [
      { text: 'Cuentas Corrientes', icon: <BadgeSharpIcon sx={{ fontSize: 32, color: '#f8d405' }} />, path: '/CtasCtes' },
      { text: 'Parametros Comprobantes', icon: <GridOnIcon sx={{ fontSize: 32, color: '#f8d405' }} />, path: '/CtasCtes/ParamComp' },
    ],
  },
  // { text: 'Cerrar sesión', icon: <LogoutIcon />, path: '/logout' },
];

export default function Sidebar() {
  const { setValor } = use(StaticContext);
  const [open, setOpen] = useState(true); // Estado del Drawer (abierto o cerrado)
  const [collapsed, setCollapsed] = useState(false); // Estado para colapsar el menú (solo íconos)
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // Detectar pantallas pequeñas
  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  // Función para renderizar los items del menú
  const renderMenuItem = (item, nested = false) =>
  // (
  {
    const button = (
      <ListItemButton
        key={item.text}
        component={Link}
        to={item.path}
        selected={location.pathname === item.path}
        onClick={() => {
          setValor(item.text);
          setCollapsed(true); // Colapsar el menú cuando se selecciona una opción
          setOpen(false); // Cerrar el Drawer en dispositivos móviles
        }}
        sx={{
          pl: nested ? 4 : 2,
          justifyContent: open && !collapsed ? 'initial' : 'center', // Si colapsado, centrar los íconos
        }}
      >
        {/* <Tooltip title={!open || collapsed ? item.text : ''} placement="right"> */}


        <ListItemIcon sx={{ minWidth: 0, mr: open && !collapsed ? 2 : 'auto' }}>
          {item.icon}
        </ListItemIcon>
        {/* </Tooltip> */}
        {open && !collapsed && <ListItemText primary={item.text} />} {/* Solo mostrar texto si no está colapsado */}
      </ListItemButton>
    );
    return (!open || collapsed) ? (
      <Tooltip title={item.text} placement="right" key={item.text}>
        {button}
      </Tooltip>
    ) : button;
  };
  // Función para abrir/cerrar el menú y restablecer el estado de collapsed
  const handleMenuToggle = () => {
    setOpen(!open);
    if (open) {
      setCollapsed(true); // Si se cierra el menú, se colapsa
    } else {
      setCollapsed(false); // Si se abre el menú, mostramos tanto íconos como nombres
    }
  };


  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'} // 'temporary' en pantallas pequeñas, 'permanent' en grandes
      open={open}
      onClose={() => setOpen(false)} // Cerrar el menú si el usuario hace clic fuera del Drawer (para móvil)
      sx={{
        width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded, // Ajusta el ancho según el estado de colapso
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded, // Ajusta el ancho del Drawer
          transition: 'width 0.3s', // Animación suave para el cambio de ancho
          overflowX: 'hidden',
        },
      }}
    >

      <IconButton onClick={handleMenuToggle} sx={{ m: 1 }}>
        <Box
          component="img"
          src="/favicon.ico" // o "/favicon.ico"
          alt="Logo"
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>

      <Divider />

      <List>
        {menuItems.map((item) => {
          const isOpen = openSections[item.text] || false;

          if (item.children) {
            return (
              <div key={item.text}>
                <ListItemButton
                  onClick={() => { toggleSection(item.text) }}
                  sx={{
                    justifyContent: open && !collapsed ? 'initial' : 'center',
                  }}
                >
                  <Tooltip title={!open || collapsed ? item.text : ''} placement="right">
                    <ListItemIcon sx={{ minWidth: 0, mr: open && !collapsed ? 2 : 'auto' }}>
                      {item.icon}
                    </ListItemIcon>
                  </Tooltip>
                  {open && !collapsed && (
                    <>
                      <ListItemText primary={item.text} />
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>

                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  {item.children.map((subItem) => renderMenuItem(subItem, true))}
                </Collapse>
              </div>
            );
          }

          // Si no tiene children, render normal
          return renderMenuItem(item, false);


        })}
      </List>

    </Drawer>
  );
}
