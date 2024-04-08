import React, { Suspense } from "react";

import { presupDatos } from "./presupDatos.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { useContext } from "react";
import StaticContexto from "../../../../context/StaticContext.jsx";
import estilotabla from "../../../../Styles/Tabla.module.css";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import CompressSharpIcon from "@mui/icons-material/CompressSharp";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import { TablaMuestraRenglon } from "./TablaMuestraRenglon/index.jsx";
import { PresupPreview } from "../PresupPreview";
import { PresupNombre } from "./PresupNombre.jsx";
import { Route, useNavigate } from "react-router-dom";

export default function PresupMuestra() {
	const { valor, setValor } = useContext(StaticContexto);

	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	var fecha = new Date();
	fecha.setDate(fecha.getDate() - 360);
	const [fechasel, setFechasel] = useState(fecha);
	const [rowsel, setRowSel] = useState();
	const [open, setOpen] = useState(false);
	// const [snackbar, setSnackbar] = React.useState(null);
	// const handleCloseSnackbar = () => setSnackbar(null);
	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);
	// const [parampresupuesto, setParamPresupuesto] = useState(1);
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [origen, setOrigen] = useState("");
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();

	const handleClose1 = () => {
		setIsOpen(false);
		// Redirecciona a donde quieras cuando se cierra el componente
		navigate("/OTrabajo");
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
		dataFetch();
		setOpen(!open);
		handleClose1();
	};

	async function armanombre(rowsel) {
		let resultrescatenombre = await PresupNombre(rowsel);
		if (resultrescatenombre.text === '[{"error":1}]')
			alert(`El presupuesto nro ${rowsel.id} no se encuentra`);
		else setPPreview({ ppreview: true });
	}

	useEffect(() => {
		initialFetch();
		setValor("Muestra Presupuesto");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablasgenerales}>
				{/* <div>
					<Typography
						className={estilotabla.titulartablas}
						// variant="h4"
					>
						{formdatos.tablabase}
					</Typography>
				</div> */}
				<GridToolbarColumnsButton className={estilotabla.coloropcioncol} />
				<GridToolbarFilterButton className={estilotabla.coloropcioncol} />
				<GridToolbarDensitySelector className={estilotabla.coloropcioncol} />
				<GridToolbarExport className={estilotabla.coloropcioncol} />
				<CompressSharpIcon
					onClick={() => handleMuestraRenglon(rowsel.id)}
					className={estilotabla.iconomodificar}
					titleAccess="Ve datos Presupuesto"
				/>
				<PreviewTwoToneIcon
					onClick={() => armanombre(rowsel)}
					className={estilotabla.iconomodificar}
					titleAccess="Preview Presupuesto"
				/>
				<LocalPrintshopRoundedIcon
					onClick={() => setImprimirTF(true)}
					className={estilotabla.iconoimpresora}
					titleAccess="Imprimir"
				/>
				<DeleteSharpIcon
					variant="contained"
					titleAccess="Borrar"
					className={estilotabla.iconoborrar}
					onClick={() => handleDelete(rowsel)}
				/>
			</GridToolbarContainer>
		);
	}

	return (
		<>
			{/* <Dialog open={open} onClose={handleClose}> */}
			{isOpen && (
				<DataGrid
					rows={rows}
					columns={columns}
					localeText={esES.components.MuiDataGrid.defaultProps.localeText}
					//  processRowUpdate={processRowUpdate}
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
			<PresupPreview
				open={ppreview.ppreview}
				setOpen={setPPreview}
			></PresupPreview>
			{/* </Dialog> */}
		</>
	);
}

{
	/* {!!snackbar && (
	<Snackbar
		open
		anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		onClose={handleCloseSnackbar}
		autoHideDuration={900}
	>
		<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
	</Snackbar>
)} */
}
