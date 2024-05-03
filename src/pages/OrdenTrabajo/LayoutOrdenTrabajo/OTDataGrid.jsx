import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { llenarcolumns } from "./columns";
import FilaAbanico from "../../Presupuesto/LayoutPresupuesto/FilaAbanico/FilaAbanico";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral";

export default function OTDataGrid({ data }) {
	// const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);

	const [open, setOpen] = useState(false);
	const [gridKey, setGridKey] = useState(0);
	// Transforma el arreglo multidimensional en un arreglo plano
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState("");
	const flattenedData = data.flatMap((nivel1) => nivel1);

	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
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

	async function handleCellClick(event) {
		var datorenglon = event.row;
		const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		setPresuptipo(paramObjeto.tipopresup);
		setDatospot(paramObjeto);
		// setOpen(true);
	}

	// const handleClose = () => {
	// 	setOpen(false);
	// 	// initialFetch();
	// };

	return (
		<div style={{ height: 400, width: "100%" }}>
			{datospot !== undefined && <OTFilaGral datospot={datospot}></OTFilaGral>}
			{presuptipo === "PILETA ENROLLABLE" && <FilaAbanico></FilaAbanico>}
			{presuptipo === "ABOLINADA" && <FilaAbanico></FilaAbanico>}
			<DataGrid
				columnHeaderHeight={35}
				key={gridKey}
				rows={rows}
				columns={columns}
				onCellClick={handleCellClick}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</div>
	);
}
// setRows((prevRows) =>
// 	prevRows.map((row) => (row.id === rowId ? { ...row, nuevafila } : row))
// );
//  const agregarFila = () => {
//     const nuevaFila = { id: rows.length + 1, name: 'Nuevo', age: 0, // Otras columnas };
//     const nuevasFilas = [...rows, nuevaFila];
//     setRows(nuevasFilas);
//   };
// Esto Funciona , agrega una columna
// if (paramObjeto.tipopresup === "CONFECCIONADA") {
// 	var colores = await StkItemsLeeAbrRub(paramObjeto.StkRubroAbr);
// 	const additionalData = {
// 		field: "StkRubroAbr",
// 		headerName: "Color",
// 		width: 100,
// 		type: "singleSelect",
// 		valueOptions: colores,
// 		editable: true,
// 	};
// 	var col = columns;
// 	col.push(additionalData);
// 	setColumns(col);
// 	setGridKey((prevKey) => prevKey + 1);
// }
// if (selectedRow.name === "John") {
// 	// Aquí podrías mostrar un modal o una interfaz para solicitar datos adicionales
// 	const additionalData = prompt("Ingrese datos adicionales para John:");
// 	setRows((prevRows) =>
// 		prevRows.map((row) =>
// 			row.id === rowId ? { ...row, additionalData } : row
// 		)
// 	);
//}

// setColumns((prevColumns) =>
// 	prevColumns.map((columnas) =>
// 		columnas.id === columnasId ? { ...columnas, additionalData } : columnas
// 	)
// );
// 	 <InputLabel id="color-picker-label">Color</InputLabel>
//   <Select
//     labelId="color-picker-label"
//     id="color-picker"
//     value={selectedColor}
//     onChange={handleChange}
//   >
//     {colors.map((color) => (
//       <MenuItem key={color.id} value={color.name}>
//         {color.name}
//       </MenuItem>
//     ))}
//   </Select>
// }
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
// async function handleCellClick(params) {
// 	const rowId = params.id;
// 	const columnName = params.field;
// 	console.log("params.length   ", rows.length);
// 	// Aquí puedes manejar la lógica para mostrar y/o solicitar datos adicionales

// 	if (columnName === "PresupRenglonParamInt") {
// 		const selectedRow = rows.find((row) => row.id === rowId);
// 		const paramObjeto = JSON.parse(selectedRow.PresupRenglonParamInt);
// 		console.log("paramObjeto  ", paramObjeto);
// 		console.log("confeccionado  ", confeccionado);

// 	}
// }

/*
		{
				field: "OtColor",
				headerName: "Color",
				width: 100,
				type: "singleSelect",
				editable: true,

			 valueOptions: colores,
				
			},
	*/
