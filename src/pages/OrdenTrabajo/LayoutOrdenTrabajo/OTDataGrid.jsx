import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { llenarcolumns } from "./columns";

// const columns = [
// 	// { field: "id", headerName: "ID", width: 90 },
// 	{ field: "idPresupRenglon", headerName: "ID Presup Renglon", width: 150 },
// 	{ field: "PresupRenglonNroPresup", headerName: "Nro Presup", width: 150 },
// 	{ field: "PresupRenglonCant", headerName: "Cantidad", width: 130 },
// 	{ field: "PresupRenglonDesc", headerName: "Descripción", width: 400 },
// 	{ field: "PresupRenglonLargo", headerName: "Largo", width: 120 },
// 	{ field: "PresupRenglonAncho", headerName: "Ancho", width: 120 },
// 	{ field: "PresupRenglonImpUnit", headerName: "Importe Unitario", width: 180 },
// 	{ field: "PresupRenglonImpItem", headerName: "Importe Item", width: 180 },
// 	// {
// 	// 	field: "PresupRenglonParamInt",
// 	// 	headerName: "Parámetros Internos",
// 	// 	width: 300,
// 	// },
// 	{
// 		field: "PresupRenglonParamInt",
// 		headerName: "Parámetros Internos",
// 		type: "singleSelect",
// 		editable: true,
// 		width: 300,
// 	},
// ];

export default function DataTable({ data }) {
	const [selectionModel, setSelectionModel] = useState([]);
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = React.useState([]);

	// Transforma el arreglo multidimensional en un arreglo plano

	const flattenedData = data.flatMap((nivel1) => nivel1);
	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
		// col.push(actionsColumn);
		setColumns(() => col);
	}

	async function dataFetch() {
		setRows(flattenedData);
	}
	async function initialFetch() {
		dataFetch();
		columnsFetch();
	}
	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSelectionModelChange = (selectionModel) => {
		console.log("flattendData  ", rows[selectionModel]);
		console.log("flattenedData  ", selectionModel);
	};

	const handleCellClick = (params) => {
		const rowId = params.id;
		const columnName = params.field;

		// Aquí puedes manejar la lógica para mostrar y/o solicitar datos adicionales
		if (columnName === "PresupRenglonParamInt") {
			const selectedRow = rows.find((row) => row.id === rowId);
			console.log(" selectedRow ", selectedRow);
			const paramObjeto = JSON.parse(selectedRow.PresupRenglonParamInt);
			console.log("paramObjeto  ", paramObjeto);
			console.log("paramObjeto  ", paramObjeto.tipopresup);
			// if (selectedRow.name === "John") {
			// 	// Aquí podrías mostrar un modal o una interfaz para solicitar datos adicionales
			// 	const additionalData = prompt("Ingrese datos adicionales para John:");
			// 	setRows((prevRows) =>
			// 		prevRows.map((row) =>
			// 			row.id === rowId ? { ...row, additionalData } : row
			// 		)
			// 	);
			//}
		}
	};
	// const actionsColumn = {
	// 	field: "StkRubroAbr",
	// 	headerName: "Tela",
	// 	width: 100,
	// 	renderCell: (params) =>
	// 		rows.forEach((element, i) => {
	// 			const paramObjeto = JSON.parse(element.PresupRenglonParamInt);
	// 			console.log("paramObjeto  ", paramObjeto.tipopresup);
	// 			if (paramObjeto.tipopresup === "PAÑO UNIDO") {
	// 				[

	// 						{field: "StkRubroAbr",
	// 						headerName: "Tela",
	// 						width: 100,}
	// 				];
	// 			}
	// 		}),
	// };
	// 									return Object.entries(paramObjeto).map(([campo, valor]) => (
	// 										<li key={campo}>
	// 											<strong>{campo}:</strong> {valor}
	// 										</li>

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				onCellClick={handleCellClick}
				pageSize={5}
				rowsPerPageOptions={[5]}
				// checkboxSelection
				// disableSelectionOnClick
				// selectionModel={selectionModel}
				// onRowSelectionModelChange={handleSelectionModelChange}
			/>
		</div>
	);
}
