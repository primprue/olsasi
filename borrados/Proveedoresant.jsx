import * as React from "react";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { llenarcolumns } from "./columns";
import { useEffect, useState, useMemo, useCallback } from "react";

import { leerproveedores } from "./ProveedoresLeer";
import { Box, Button, Modal } from "@mui/material";

export default function Proveedores() {
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [modalEditar, setModalEditar] = useState(false);
	const abrirCerrarModalEditar = () => {
		setModalEditar(!modalEditar);
	};
	async function columnsFetch() {
		const col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await leerproveedores();
		setData(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const handleDeleteRow = () => {
		// const rowIds = apiRef.current.getAllRowIds();
		// const rowId = randomArrayItem(rowIds);
		// apiRef.current.updateRows([{ id: rowId, _action: "delete" }]);
	};
	const handleAddRow = () => {
		console.log("prevRows  ", prevRows);
		// setRows((prevRows) => [...prevRows, createRandomRow()]);
	};
	// apiRef.current.updateRows([createRandomRow()]);

	const handleUpdateRow = () => {
		// const rowIds = apiRef.current.getAllRowIds();
		// const rowId = randomArrayItem(rowIds);
		// apiRef.current.updateRows([{ id: rowId, username: randomUserName() }]);
	};

	const handleUpdateAllRows = () => {
		// const rowIds = apiRef.current.getAllRowIds();
		// apiRef.current.updateRows(
		// 	rowIds.map((rowId) => ({ id: rowId, username: randomUserName() }))
		// );
	};
	const EditToolbar = (data) => {
		// const { setData } = props;
		// const handleClick = () => {
		// const id = randomId();
		// setData((oldData) => [...oldData, { isNew: true }]);
		// setRowModesModel((oldModel) => ({
		// 	...oldModel,
		// 	[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		// }));
		// }
		// return (
		// 	<GridToolbarContainer>
		// 		<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
		// 			Add record
		// 		</Button>
		// 	</GridToolbarContainer>
		// );
	};

	const processRowUpdate = React.useCallback(
		(newRow, oldRow) =>
			new Promise((resolve, reject) => {
				const mutation = computeMutation(newRow, oldRow);
				// if (mutation) {
				// 	// Save the arguments to resolve or reject the promise later
				// 	setPromiseArguments({ resolve, reject, newRow, oldRow });
				// } else {
				// 	resolve(oldRow); // Nothing was changed
				// }
			}),
		[]
	);
	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
				<Button onClick={EditToolbar(data)} startIcon={<AddIcon />}>
					Agregar
				</Button>
			</GridToolbarContainer>
		);
	}

	const handleRowClick = (params) => {
		// console.log("params  ", params.row + "." + columns[1].field);
	};
	const pantalla = (
		<div>
			<p>
				Estás seguro que deseas eliminar la consola{" "}
				{/* <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?{" "} */}
			</p>
			<div align="right">
				{columns.map((col) => console.log("col ", col.headerName))}
				{/* <Button color="secondary" onClick={() => peticionDelete()}>
					Sí
				</Button>
				<Button onClick={() => abrirCerrarModalEliminar()}>No</Button> */}
			</div>
		</div>
	);
	return (

<>		
<h1>proveedores</h1>
		<Box sx={{ width: "100%" }}>
			<Button size="small" onClick={handleUpdateRow}>
				Update a row
			</Button>
			<Button size="small" onClick={handleUpdateAllRows}>
				Update all rows
			</Button>
			<Button size="small" onClick={handleDeleteRow}>
				Delete a row
			</Button>
			<Button size="small" onClick={handleAddRow}>
				Add a row
			</Button>
			<Box sx={{ height: 400, mt: 1 }}>
				<DataGrid
					rows={data}
					columns={columns}
					editMode="row"
					onRowClick={handleRowClick}
					localeText={esES.components.MuiDataGrid.defaultProps.localeText}
					processRowUpdate={processRowUpdate}
					slots={{
						toolbar: CustomToolbar,
					}}
					getDetailPanelContent={({ data }) => (
						<Box sx={{ p: 2 }}>{`Order #${data[0]}`}</Box>
					)}
					// getDetailPanelContent={({ data }) => (
					// 	<Box sx={{ p: 2 }}>{`Order #${data[0]}`}</Box>
					// )}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>

				<Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
					{pantalla}
				</Modal>
			</Box>
		</Box>
		</>
	);
}


