import React, { Component } from "react";

import { leerTransporte } from "./TransporteLeer";
import { llenarcolumns } from "./columns.jsx";
import { TransporteModificar } from "./TransporteModificar.jsx";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import estilotabla from "../../../Styles/Tabla.module.css";
import { green } from "@mui/material/colors";
//https://www.youtube.com/watch?v=1zYf4Yw1jqs usa custom hooks y en el ejemplo maneja promesas y errores
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DialogoDatos } from "../../../components/DialogoDatos.jsx";
import { useContext } from "react";
import StaticContexto from "../../../context/StaticContext.jsx";
import TablasContexto from "../../../context/TablasContext.jsx";
import { formdata } from "./formdata.js";
import SelecCampos from "../../Impresion/SelecCampos.jsx";
import { IconButton, Tooltip } from "@mui/material";
export default function Transporte() {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { valor, setValor } = useContext(StaticContexto);
	const [imprimirTF, setImprimirTF] = useState(false);
	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	const [nombreboton, setNombreBoton] = useState("");
	const [titulodial, setTituloDial] = useState("");
	const [paramsbor, setParamsBor] = useState(0);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await leerTransporte();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Transportes");
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [open, setOpen] = React.useState(false);

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();
	const [rowsel, setRowSel] = useState();

	const handleCloseImprimir = () => {
		setImprimirTF(false);
	};
	const handleClose = () => {
		setOpen(false);
		initialFetch();
	};

	const handleAlta = () => {
		console.log("handle alta  ");
		setNombreBoton("Enviar");
		setTituloDial(`Alta de ${valor}`);
		setOpen(true);
	};

	const handleModifica = (params) => {
		setTimeout(() => {
			TransporteModificar(params);
		}, 1000);
	};

	const handleDelete = (params) => {
		setNombreBoton("Borrar");
		setTituloDial("BORRA ESTE DATO!!!!!");
		setParamsBor(params);
		setOpen(true);
	};

	const useFakeMutation = () => {
		return React.useCallback(
			(user) =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						if (user.name?.trim() === "") {
							reject(new Error("Error el campo no puede estar vacío"));
						} else {
							resolve({ ...user, name: user.name?.toUpperCase() });
						}
					}, 200);
				}),
			[]
		);
	};

	const mutateRow = useFakeMutation();
	const processRowUpdate = React.useCallback(
		async (newRow, oldRow) => {
			setRown(newRow);
			setRowv(oldRow);
			const response = await mutateRow(newRow);
			setSnackbar({
				children: "Modificado no confirmado",
				severity: "success",
			});
			return response;
		},
		[mutateRow]
	);
	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablasgenerales}>
				<GridToolbarColumnsButton style={{ color: green[900] }} />
				<GridToolbarFilterButton style={{ color: green[900] }} />
				<GridToolbarDensitySelector style={{ color: green[900] }} />
				<GridToolbarExport style={{ color: green[900] }} />
				<LocalPrintshopRoundedIcon
					onClick={() => setImprimirTF(true)}
					style={{ color: green[500] }}
					fontSize="medium"
					titleAccess="Imprimir"
				/>
				<Tooltip title="Agregar" arrow>
					<IconButton color="primary" size="large" onClick={() => handleAlta()}>
						<AddToPhotosTwoToneIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Confirma Modificación" arrow>
					<IconButton
						variant="contained"
						color="success"
						onClick={() => handleModifica(rown)}
					>
						<CheckCircleTwoToneIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Borra Elemento Elegido" arrow>
					<IconButton
						variant="contained"
						color="warning"
						onClick={() => handleDelete(rowsel)}
					>
						<DeleteForeverTwoToneIcon />
					</IconButton>
				</Tooltip>
			</GridToolbarContainer>
		);
	}

	return (
		<>
			<DataGrid
				sx={{
					//esto es el estilo del encabezado de las columnas
					height: 700,
					width: "100%",
					"& .encabcolumns": {
						backgroundColor: "rgba(57, 192, 68, 0.651)",
						textJustify: "center",
						fontSize: "15px",
						fontWeight: "bold",
						color: "rgba(22, 53, 25, 0.7)",
						borderRadius: 1,
						boxShadow: 3,
						bgcolor: "rgba(224, 211, 29, 0.144)",
						height: 4,
					},
				}}
				rows={rows}
				columns={columns}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				processRowUpdate={processRowUpdate}
				onRowClick={handleRowSelect}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				showCellVerticalBorder={true}
				columnHeaderHeight={35}
				slots={{
					toolbar: CustomToolbar,
				}}
				initialState={{
					...rows.initialState,
					pagination: {
						...rows.initialState?.pagination,
						paginationModel: {
							pageSize: 25,
						},
					},
				}}
			/>
			<DialogoDatos
				open={open}
				columns={columns}
				handleClose={handleClose}
				nombrebtn={nombreboton}
				paramsbor={paramsbor}
				titulodial={titulodial}
			/>
			<SelecCampos
				columns={columns}
				datos={rows}
				open={imprimirTF}
				setOpen={setImprimirTF}
				handleClose={handleCloseImprimir}
			/>
			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</>
	);
}
