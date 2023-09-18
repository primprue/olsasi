import React, { Component } from "react";
import Button from "@mui/material/Button";
import { ButtonGroup, IconButton, Stack } from "@mui/material";
import { leerproveedores } from "./ProveedoresLeer.jsx";
import { ProveedoresModificar } from "./ProveedoresModificar.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { DialogoDatos } from "./DialogoDatos.jsx";
import EditIcon from "@mui/icons-material/Edit";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import {
	TextField,
	Dialog,
	DialogContentText,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { formdata } from "./formdata.js";
import { datos_state } from "./datos_states.js";

//https://www.youtube.com/watch?v=1zYf4Yw1jqs usa custom hooks y en el ejemplo maneja promesas y errores
import Register from "./Register.jsx";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
	GridCellEditStopReasons,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { DialogoDatosM } from "./DialogoDatosM.jsx";
import { useContext } from "react";
import { globalContext } from "../../../../App.jsx";

export default function Proveedores() {
	const { setValor } = useContext(globalContext);
	const [rows, setRows] = React.useState([]);
	const [selectedRows, setSelectedRows] = React.useState([]);

	const [columns, setColumns] = useState([]);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		col.push(actionsColumn);
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await leerproveedores();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [selectedValue, setSelectedValue] = React.useState();
	const [open, setOpen] = React.useState(false);
	// const [openm, setOpenm] = React.useState(false);
	const [row, setRow] = useState();
	const [titulos, setTitulos] = useState();
	const [valores, setValores] = useState();

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();
	const handleChange = (event) => {
		// const id = event.target.id;
		// setState({ ...state, [id]: event.target.value });
		console.log("event  ", event.target.id);
		console.log("event.target.value  ", event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// const handleClosem = () => {
	//   setOpenm(false);

	// };

	// const handleEditm = (params) => {
	//   setOpenm(true);
	// }
	const handleEdit = (params) => {
		setOpen(true);
		// var filaeleg = params.row
		// setSelectedValue( params.row)
		// setTitulos(Object.keys(filaeleg))
		// setValores(Object.values(filaeleg))
	};

	const handleModifica = (params) => {
		console.log("params handleModifica ", params);
		console.log("rowv handleModifica ", rowv);
		console.log("rown handleModifica ", rown);
		ProveedoresModificar(params.row);
		console.log("datos_states  ", datos_state);
		//   console.log('vino a handleModifica  ', modificado)
		//   console.log('vino a handleModifica event ', event)
	};

	const handleDelete = (elegidoparaborrar) => {
		console.log("vino a handleDelete  ", elegidoparaborrar);
	};
	const actionsColumn = {
		field: "actions",
		headerName: "Acciones",
		width: 120,
		renderCell: (params) => (
			<ButtonGroup>
				<Button
					variant="outlined"
					color="warning"
					onClick={() => handleModifica(params)}
					startIcon={<EditIcon />}
				/>
				<Button
					variant="outlined"
					color="warning"
					onClick={() => handleDelete(params.id)}
					startIcon={<DeleteForeverTwoToneIcon />}
				/>
			</ButtonGroup>
		),
	};
	const [selectedCell, setSelectedCell] = useState(null);

	const getCellBackground = (rowIdx, columnIdx) => {
		if (
			selectedCell &&
			selectedCell.rowIdx === rowIdx &&
			selectedCell.columnIdx === columnIdx
		) {
			return "red"; // Cambia el color que prefieras aquí
		}
		return "white";
	};
	const useFakeMutation = () => {
		return React.useCallback(
			(user) =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						if (user.name?.trim() === "") {
							reject(new Error("Error el campor no puede estar vacío"));
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
			console.log("processRowUpdate newRow  ", newRow);
			// Make the HTTP request to save in the backend
			const response = await mutateRow(newRow);
			setSnackbar({ children: "User successfully saved", severity: "success" });
			return response;
		},
		[mutateRow]
	);

	// const processRowUpdate = (newRow, oldRow) => {
	//   console.log('newRow  ', newRow)
	//  console.log('oldRow  ', oldRow)
	//  setRown(newRow)
	//  setRowv(oldRow)
	// }

	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
				<Button
					startIcon={<AddToPhotosTwoToneIcon />}
					onClick={() => handleEdit()}
				>
					Agregar
				</Button>
			</GridToolbarContainer>
		);
	}

	return (
		<div
			// style={{ height: 500, width: '150%' }}
			style={{ height: 500, width: "150%" }}
		>
			<Register></Register>
			<DataGrid
				rows={rows}
				columns={columns}
				autoHeight={true}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				// editMode='row'
				// getCellBackground={getCellBackground}
				// showCellVerticalBorder={true}
				processRowUpdate={processRowUpdate}
				// https://codesandbox.io/s/kl4gx4?file=/Demo.js:749-764
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

			{/* <DialogoDatos
            open={open}
            columns={columns}
            handleClose={handleClose}
            /> */}

			<DialogoDatosM open={open} columns={columns} handleClose={handleClose} />

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
		</div>
	);
}

// onCellDoubleClick={handleCellDoubleClick}
// onCellEditStop={(params, event) => {handleModifica(params, event)
//   // if (params.reason === GridCellEditStopReasons.cellFocusOut) {
//   //   event.defaultMuiPrevented = true;
//   // }
// }}
// disableColumnMenu // Deshabilitar el menú de columnas para evitar conflictos con el redimensionamiento
// const handleCellDoubleClick = (selection, rowIdx, columnIdx) => {
//   setSelectedRows(selection.selectionModel);
//   console.log('rowI  ', rowIdx)
//   setSelectedCell({ rowIdx, columnIdx });
//   console.log(' selection ', selection)
//   // setRow(selection.row)
//   // handleEditm()
//   console.log(' selection.row ', selection.row)
//   console.log(' selection.field ', selection.field)
//   console.log('selection.selectionModel  ', selection.selectionModel)
// };
