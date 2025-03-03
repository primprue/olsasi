import React, { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import {

	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";

import { esES } from '@mui/material/locale';
import estilotabla from "../../Styles/Tabla.module.css";

import FitbitIcon from "@mui/icons-material/Fitbit";
import { leelistaprecios } from "./LeeListaPrecios";
import { llenarcolumns } from "./columns.jsx";
import TablaMuestraStock from "./TablaMuestraStock.jsx";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";

// import { useContext } from "react";
// import StaticContexto from "../../context/StaticContext.jsx";
import SelecCampos from "../Impresion/SelecCampos.jsx";

export default function ListaPrecios() {
	// const { setValor } = useContext(StaticContexto);
	const [paramitems, setParamItems] = useState({
		idGrupo: 0,
		idRubro: 0,
	});

	const [open, setOpen] = React.useState(false);
	const [imprimirTF, setImprimirTF] = useState(false);

	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	async function columnsFetch() {
		var col = await llenarcolumns();
		col.push(actionsColumn);
		setColumns(col);
	}
	async function dataFetch() {
		const data = await leelistaprecios();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	useEffect(() => {
		initialFetch();
		// setValor("Lista de Precios");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const openApp = (params) => {
		setParamItems({
			paramitems,
			idGrupo: params.row.StkRubroCodGrp,
			idRubro: params.row.idStkRubro,
		});
		handleClickOpen();
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleCloseImprimir = () => {
		setImprimirTF(false);
	};

	const handleClose = () => {
		setParamItems({ paramitems, idGrupo: 0, idRubro: 0 });
		setOpen(false);
	};

	const actionsColumn = {
		field: "actions",
		headerName: "Stock",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={{ color: deepOrange[800] }}
				placeholder="Ver Stock"
				fontSize="large"
				onClick={() => openApp(params)}
				startIcon={<FitbitIcon />}
			/>
		),
	};

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablalistaprecios}>
				<Box
					sx={{
						width: "100%",
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'left',
						padding: '8px 0px 8px 0px'
					}}
				>
					<Typography
						className={estilotabla.titulo}
					>
						Lista de Precios
					</Typography>
					<Box
						sx={{
							width: "80%",
							display: 'flex',
							justifyContent: 'right',
							alignItems: 'right',
							gap: 3,
						}}
					>
						<LocalPrintshopRoundedIcon
							onClick={() => setImprimirTF(true)}
							style={{ color: blue[800] }}
							fontSize="medium"
							titleAccess="Imprimir"
						/>
						<GridToolbarExport style={{ color: green[800] }} />
					</Box></Box>
			</GridToolbarContainer >
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				align: "center",
				justifycontent: "center",
				boxShadow: 5,
				padding: 5,
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				title="Lista de Precios"
				localeText={esES}
				slots={{
					toolbar: CustomToolbar,
				}}
				getCellClassName={() => `super-app-theme--Open`}
				getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
			/>

			<SelecCampos
				columns={columns}
				datos={rows}
				open={imprimirTF}
				handleClose={handleCloseImprimir}
			/>
			<TablaMuestraStock
				open={open}
				handleClose={handleClose}
				Grupo={paramitems.idGrupo}
				Rubro={paramitems.idRubro}
			/>
		</Box>
	);
}
