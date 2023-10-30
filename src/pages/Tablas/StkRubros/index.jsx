import React from "react";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";
import { llenarcolumns } from "./columns.jsx";
import { StkRubroModificar } from "./StkRubroModificar.jsx";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import estilotabla from "../../../Styles/Tabla.module.css";
import { green } from "@mui/material/colors";
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
import { IconButton, Tooltip } from "@mui/material";
// export const ProveedoresContext = React.createContext();
export default function StkRubros() {
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
		const data = await stkrubroleermezcla();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Rubros");
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [open, setOpen] = React.useState(false);

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();
	const [rowsel, setRowSel] = useState();
	const styles = {
		root: {
			background: "red",
		},
	};
	const handleCloseImprimir = () => {
		setImprimirTF(false);
	};

	const handleClose = () => {
		setOpen(false);
		initialFetch();
	};

	const handleAlta = () => {
		setNombreBoton("Enviar");
		setTituloDial(`Alta de ${valor}`);
		setOpen(true);
	};

	const handleModifica = (params) => {
		console.log("params  ", params);
		setTimeout(() => {
			StkRubroModificar(params);
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
			{/* </ProveedoresContext.Provider> */}
		</>
	);
}

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
// 	"& .super-app-theme--Open": {
// 		backgroundColor: "rgba(232, 250, 241, 0.3)",
// 		textJustify: "center",
// 		fontSize: "16px",
// 		color: "rgba(51, 99, 29, 0.966)",
// 		borderRadius: 8,
// 		boxShadow: 5,
// 		gridArea: "main",
// 	},
// }));

// const [selectionModel, setSelectionModel] = useState([]);
// const [ideleg, setIdeleg] = useState(0);
// const handleSelectionModelChange = (selectionModel) => {
// 	console.log("selectionModle  ", selectionModel);
// 	const selectedLeyendas = selectionModel.map((row, i) =>
// 		rows.filter((rowse) => rowse.id == row)
// 	);

// 	console.log("selectedLeyendas  ", selectedLeyendas);

// 	console.log("selectedLeyendas [0][0] ", selectedLeyendas[0][0].id);
// 	setIdeleg(selectedLeyendas[0][0]);
// 	// setSelectionModel(selectedLeyendas);
// 	// setState({ ...state, condpagoeleg: selectedLeyendas });
// };
// const handleRowEditStop = (params, event) => {
// 	if (params.reason === GridRowEditStopReasons.rowFocusOut) {
// 		event.defaultMuiPrevented = true;
// 	}
// };

// // Función para manejar las ediciones
// const handleCellEdit = ({ fromRow, toRow, updated }) => {
// 	// Registra las modificaciones en el estado 'changes'
// 	console.log("from  ", fromRow, "to ", toRow, "updated ", updated);
// 	const updatedChanges = [...changes];
// 	for (let i = fromRow; i <= toRow; i++) {
// 		updatedChanges[i] = { ...updatedChanges[i], ...updated };
// 	}
// 	setChanges(updatedChanges);
// };
