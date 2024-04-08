import React, { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import {
	esES,
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import estilotabla from "../../Styles/Tabla.module.css";

import FitbitIcon from "@mui/icons-material/Fitbit";
import { leelistaprecios } from "./LeeListaPrecios";
import { llenarcolumns } from "./columns.jsx";
import TablaMuestraStock from "./TablaMuestraStock.jsx";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";

import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import SelecCampos from "../Impresion/SelecCampos.jsx";

export default function ListaPrecios() {
	const { setValor } = useContext(StaticContexto);
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
		setValor("Lista de Precios");
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
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<LocalPrintshopRoundedIcon
					onClick={() => setImprimirTF(true)}
					style={{ color: blue[800] }}
					fontSize="medium"
					titleAccess="Imprimir"
				/>
				<GridToolbarExport style={{ color: green[800] }} />
			</GridToolbarContainer>
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				height: "500px",
				align: "center",
				justifycontent: "center",
				boxShadow: 5,
			}}
		>
			<DataGrid
				autoHeight
				sx={{
					width: "100%",
					"& .encabcolumns": {
						backgroundColor: "rgba(235, 240, 241, 0.3)",
						textJustify: "center",
						fontSize: "15px",
						fontWeight: "bold",
						color: "rgba(15, 6, 145)",
						borderRadius: 1,
						boxShadow: 3,
						bgcolor: "rgba(235, 240, 241, 0.3)",
						height: 10,
					},
				}}
				rows={rows}
				columns={columns}
				title="Lista de Precios"
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
