import React from "react";
import { Link } from "react-router-dom";
import {
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Button,
	IconButton,
} from "@mui/material";
import RequestQuoteTwoToneIcon from "@mui/icons-material/RequestQuoteTwoTone";
import DifferenceTwoToneIcon from "@mui/icons-material/DifferenceTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import CabinTwoToneIcon from "@mui/icons-material/CabinTwoTone";
import { useContext, useEffect } from "react";
import StaticContext from "../../context/StaticContext";
import moment from "moment";
import { clientestraeNuevos } from "../../pages/Tablas/Clientes/ClientesTraeNuevos";
import { clientesCobol } from "../../pages/Tablas/Clientes/ClientesCobol";
import PropBarra from "../../Styles/Header.module.css";

/* ver https://www.youtube.com/watch?v=8-sn405JX1Q&list=PLiio6JvlTLAxDn8azg7jgKJsrdiF4yKCN&index=1&t=50s */

/*  OJO!!!!! cuando agrego una opción en el menú 
  no olvidar agregarla en 
/home/sandra/SistOLSA/OlsaSG/src/components/Main/index.js*/

function Header() {
	const { valor } = useContext(StaticContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [anchorEl1, setAnchorEl1] = React.useState(null);
	const open1 = Boolean(anchorEl1);

	const handleClick1 = (event) => {
		setAnchorEl1(event.currentTarget);
	};
	const handleClose1 = () => {
		setAnchorEl1(null);
	};

	const [anchorEl2, setAnchorEl2] = React.useState(null);
	const open2 = Boolean(anchorEl2);

	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const [anchorEl3, setAnchorEl3] = React.useState(null);
	const open3 = Boolean(anchorEl3);

	const handleClick3 = (event) => {
		setAnchorEl3(event.currentTarget);
	};
	const handleClose3 = () => {
		setAnchorEl3(null);
	};

	const diafecha = moment().format("DD-MM-YYYY");
	// const [state, setState] = useState(initial_state);
	useEffect(() => {
		clientestraeNuevos();
		clientesCobol();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div height={"50px"}>
			<Toolbar className={PropBarra.barraherr}>
				<Button
					className={PropBarra.botonmenu1}
					component={Link}
					to="/"
					onClick={handleClose}
					startIcon={<CabinTwoToneIcon />}
				></Button>

				<Button
					className={PropBarra.botonmenu}
					id="basic-button"
					aria-controls={open ? "basic-button" : undefined}
					aria-expanded={open ? "true" : undefined}
					aria-haspopup="true"
					onClick={handleClick}
					startIcon={<RequestQuoteTwoToneIcon />}
				>
					Presup-Lista-OT
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/PresupPant"
						onClick={handleClose}
					>
						Presupuesto
					</MenuItem>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/ListaPrecios"
						onClick={handleClose}
					>
						Lista de Precios
					</MenuItem>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/OTrabajo"
						onClick={handleClose}
					>
						Orden de Trabajo
					</MenuItem>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/PresupMuestra"
						onClick={handleClose}
					>
						Muestra Presupuesto
					</MenuItem>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/ModificaPrecios"
						onClick={handleClose}
					>
						Modifica Precios
					</MenuItem>
				</Menu>
				<Button
					className={PropBarra.botonmenu}
					id="basic-button1"
					aria-controls={open1 ? "basic-button1" : undefined}
					aria-haspopup="true"
					aria-expanded={open1 ? "true" : undefined}
					onClick={handleClick1}
					startIcon={<DifferenceTwoToneIcon />}
				>
					Stock
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl1}
					open={open1}
					onClose={handleClose1}
					MenuListProps={{
						"aria-labelledby": "basic-button1",
					}}
				>
					<MenuItem
						className={PropBarra.botonitem}
						component={Link}
						to="/MovStockPant"
						onClick={handleClose1}
					>
						Movimiento Stock
					</MenuItem>
				</Menu>
				<Button
					className={PropBarra.botonmenu}
					id="basic-button2"
					aria-controls={open2 ? "basic-button2" : undefined}
					aria-haspopup="true"
					aria-expanded={open2 ? "true" : undefined}
					onClick={handleClick2}
					startIcon={<TableChartTwoToneIcon />}
				>
					Tablas
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl2}
					open={open2}
					onClose={handleClose2}
					MenuListProps={{
						"aria-labelledby": "basic-button2",
					}}
				>
					<div>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/Proveedores"
							onClick={handleClose2}
						>
							Proveedores
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/Clientes"
							onClick={handleClose2}
						>
							Clientes
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/Transporte"
							onClick={handleClose2}
						>
							Transporte
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/StkMonedas"
							onClick={handleClose2}
						>
							Monedas
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/StkGrupos"
							onClick={handleClose2}
						>
							Grupos
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/StkRubros"
							onClick={handleClose2}
						>
							Rubros
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/StkItems"
							onClick={handleClose2}
						>
							Items
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/StkUnMed"
							onClick={handleClose2}
						>
							Unidad de Medidas
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/UbFisica"
							onClick={handleClose2}
						>
							Ubicación Física
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/PresupConfTipo"
							onClick={handleClose2}
						>
							Presupuesto Tipo
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/PresupDetPie"
							onClick={handleClose2}
						>
							Pie de Presupuesto
						</MenuItem>
					</div>
				</Menu>
				<Typography variant="h6" className={PropBarra.title}>
					{valor}
				</Typography>
				<Typography variant="h6" className={PropBarra.titleizq}>
					{diafecha}
				</Typography>
				<Typography variant="h6" className={PropBarra.title}>
					<IconButton
						size="medium"
						edge="start"
						color="primary"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={handleClick3}
					></IconButton>
				</Typography>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl3}
					open={open3}
					onClose={handleClose3}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<div>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/BackupDiario"
							onClick={handleClose3}
						>
							Backup Diario
						</MenuItem>
						<MenuItem
							component={Link}
							className={PropBarra.botonitem}
							to="/RecuperaDatos"
							onClick={handleClose3}
						>
							Recupera Datos
						</MenuItem>
					</div>
				</Menu>
			</Toolbar>
		</div>
	);
	// }
}

export default Header;
