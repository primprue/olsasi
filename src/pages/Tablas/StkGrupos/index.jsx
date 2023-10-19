import React, { Component } from "react";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { stkgrupolee } from "./StkGrupoLee.jsx";
import { llenarcolumns } from "./columns.jsx";
import { StkGrupoModificar } from "./StkGrupoModificar.jsx";
import { StkGrupoBorrar } from "./StkGrupoBorrar.jsx";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import { styled } from "@mui/material/styles";
import estilotabla from "../../../Styles/Tabla.module.css";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
// import { formdataprov } from "../formdata.js";
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
// import { tablasContext } from "../Tablas.jsx";
// export const ProveedoresContext = React.createContext();
export default function StkGrupos() {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { setValor } = useContext(StaticContexto);
	const [imprimirTF, setImprimirTF] = useState(false);
	//	const [formdatos, setFormdatos] = useState(formdata);
	const [rows, setRows] = React.useState([]);

	const [columns, setColumns] = useState([]);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		col.push(actionsColumn);
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await stkgrupolee();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Grupos");
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [open, setOpen] = React.useState(false);

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();

	const handleCloseImprimir = () => {
		setImprimirTF(false);
	};

	const handleClose = () => {
		setOpen(false);
		initialFetch();
	};

	const handleEdit = (params) => {
		setOpen(true);
	};

	const handleModifica = (params) => {
		// var moduloimp = "./StkGrupoModificar.jsx";
		// onRowUpdate(params.row, moduloimp);

		setTimeout(() => {
			StkGrupoModificar(params.row);
		}, 1000);
	};

	const handleDelete = (params) => {
		// onRowDelete(params.row);
		setTimeout(() => {
			StkGrupoBorrar(params.row);
		}, 1000);
	};
	const actionsColumn = {
		field: "actions",
		headerName: "Acciones",
		headerClassName: "encabcolumns",
		width: 180,
		renderCell: (params) => (
			<ButtonGroup>
				<Button
					variant="contained"
					color="success"
					onClick={() => handleModifica(params)}
					startIcon={<CheckCircleTwoToneIcon />}
				/>
				<Button
					variant="contained"
					color="warning"
					// onClick={() => onRowDelete(params.row)}
					onClick={() => handleDelete(params)}
					startIcon={<DeleteForeverTwoToneIcon />}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={() => handleEdit(params)}
					startIcon={<AddToPhotosTwoToneIcon />}
				/>
			</ButtonGroup>
		),
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
			</GridToolbarContainer>
		);
	}

	const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
		"& .super-app-theme--Open": {
			backgroundColor: "rgba(232, 250, 241, 0.3)",
			textJustify: "center",
			fontSize: "16px",
			color: "rgba(51, 99, 29, 0.966)",
			borderRadius: 8,
			boxShadow: 5,
			gridArea: "main",
		},
	}));

	return (
		<div style={{ height: 500, width: "150%" }}>
			{/* <ProveedoresContext.Provider
				value={{
					formdatos: formdatos,
					setFormdatos: setFormdatos,
				}}
			> */}
			<StyledDataGrid
				sx={{
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
				autoHeight={true}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				slots={{
					toolbar: CustomToolbar,
				}}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[10, 10]}
			/>

			<DialogoDatos open={open} columns={columns} handleClose={handleClose} />
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
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
			{/* </ProveedoresContext.Provider> */}
		</div>
	);
}
