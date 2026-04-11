import React, { Suspense } from "react";

import { presupDatos } from "./presupDatos.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo.jsx";
import estilotabla from "../../../../Styles/Tabla.module.css";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import { TablaMuestraRenglon } from "./TablaMuestraRenglon/index.jsx";
// import { PresupPreview } from "../PresupPreview";
// import { PresupNombre } from "./PresupNombre.jsx";
import VisorPresupuesto from "./VisorPresupuesto.jsx";
import { Route, useNavigate } from "react-router-dom";

export default function PresupMuestra() {
	const { otdatos, setOTdatos } = use(OrdTrabajo);
	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	var fecha = new Date();
	fecha.setDate(fecha.getDate() - 360);
	const [fechasel, setFechasel] = useState(fecha);
	const [rowsel, setRowSel] = useState();
	const [open, setOpen] = useState(false);
	const [snackbar, setSnackbar] = React.useState(null);

	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [origen, setOrigen] = useState("");
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();

	const handleClose1 = () => {

		// Redirecciona a donde quieras cuando se cierra el componente
		navigate("/otrabajo/OTrabajo");
		setIsOpen(false);

	};
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await presupDatos(fechasel);
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

	const handleDelete = () => {
		setOrigen("Borrar");
		handleClickOpen();
	};
	const handleMuestraRenglon = (params) => {
		setOrigen("Mostrar");
		handleClickOpen();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		//dataFetch();
		if (otdatos.renglonespresup) {
			setOpen(!open);
			handleClose1();
		}
	};

	// async function armanombre(rowsel) {
	// 	let resultrescatenombre = await PresupNombre(rowsel);
	// 	if (resultrescatenombre.text === '[{"error":1}]')
	// 		alert(`El presupuesto nro ${rowsel.id} no se encuentra`);
	// 	else
	// 		setPPreview({ ppreview: true });
	// }
	// async function armanombre1(rowsel) {
	// 	setPPreview({ ppreview: true });
	// }

	const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState(null);
	const [abrirModal, setAbrirModal] = useState(false);

	// Esta es la función que disparás al cliquear el ícono de la fila
	const manejarClickPreview = (rowsel) => {
		setPresupuestoSeleccionado({
			rowsel
		});
		setAbrirModal(true);
	};
	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function CustomToolbar() {
		return (
			<>
				<GridToolbarContainer className={estilotabla.tablasgenerales}>
					<GridToolbarColumnsButton className={estilotabla.coloropcioncol} />
					<GridToolbarFilterButton className={estilotabla.coloropcioncol} />
					<GridToolbarDensitySelector className={estilotabla.coloropcioncol} />
					<GridToolbarExport className={estilotabla.coloropcioncol} />
					<PlaylistAddCheckRoundedIcon
						onClick={() => handleMuestraRenglon(rowsel.id)}
						className={estilotabla.iconoordentrabao}
						titleAccess="Ve datos Presupuesto"
					/>
					{/* <PreviewTwoToneIcon
						onClick={() => armanombre(rowsel)}
						className={estilotabla.iconomodificar}
						titleAccess="Preview Presupuesto"
					/> */}
					{/* <PreviewTwoToneIcon
						onClick={() => armanombre1(rowsel)}
						className={estilotabla.iconomodificar}
						titleAccess="Preview Presupuesto"
					/> */}
					<PreviewTwoToneIcon
						onClick={() => manejarClickPreview(rowsel)}
						className={estilotabla.iconomodificar}
						titleAccess="Preview Presupuesto"
					/>
					<DeleteSharpIcon
						variant="contained"
						titleAccess="Borrar"
						className={estilotabla.iconoborrar}
						onClick={() => handleDelete(rowsel)}
					/>
				</GridToolbarContainer>
			</>
		);
	}

	return (
		<div style={{ height: 600, width: '100%' }}>
			{/* <Box
				sx={{
					width: "100%",
					align: "center",
					justifycontent: "center",
					boxShadow: 5,
					padding: 5,
				}}
			> */}
			{isOpen && (
				<DataGrid
					rows={rows}
					columns={columns}
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
			)}
			{rowsel !== undefined && (
				<TablaMuestraRenglon
					open={open}
					handleClose={handleClose}
					Presup={rowsel}
					origen={origen}
				/>
			)}
			{/* {rowsel !== undefined && (
				<PresupPreview
					open={ppreview.ppreview}
					setOpen={setPPreview}
					rowsel={rowsel}
				></PresupPreview>)} */}
			{abrirModal && (
				<VisorPresupuesto
					open={abrirModal}
					datos={presupuestoSeleccionado}
					alCerrar={() => setAbrirModal(false)}
				/>
			)}
			{/* </Box> */}
		</div>
	);
}

