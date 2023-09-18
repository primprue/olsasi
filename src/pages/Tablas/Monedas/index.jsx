import React, { Component } from "react";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import { leerStkMonedas } from "./StkMonedasLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { StkMonedasModificar } from "./StkMonedasModificar.jsx";
import { StkMonedasBorrar } from "./StkMonedasBorrar.jsx";
import { useEffect } from "react";
import { useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
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
export default function StkMonedas() {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { setValor } = useContext(StaticContexto);
	const [rows, setRows] = React.useState([]);

	const [columns, setColumns] = useState([]);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		col.push(actionsColumn);
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await leerStkMonedas();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Monedas");
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [open, setOpen] = React.useState(false);

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();

	const handleClose = () => {
		setOpen(false);
		initialFetch();
	};

	const handleEdit = () => {
		setOpen(true);
	};

	const handleModifica = (params) => {
		setTimeout(() => {
			StkMonedasModificar(params.row);
		}, 1000);
	};

	const handleDelete = (params) => {
		// onRowDelete(params.row);
		setTimeout(() => {
			StkMonedasBorrar(params.row);
		}, 1000);
	};
	const actionsColumn = {
		field: "actions",
		headerName: "Acciones",
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
					onClick={() => handleEdit()}
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
					console.log("esta en el useFakeMutation  ", open);
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
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</GridToolbarContainer>
		);
	}

	return (
		<div style={{ height: 500, width: "150%" }}>
			<DataGrid
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
