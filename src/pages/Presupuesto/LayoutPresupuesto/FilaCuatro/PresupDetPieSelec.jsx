import React, { useEffect, useState } from "react";

import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { presupdetpieColumns } from "../../PresupDetPie/presupdetpieColumns";
import { presupdetpieData } from "../../PresupDetPie/presupdetpieData";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
var arregloeleg1 = [];
export default function PresupDetPieSelect() {
	const { state, setState } = useContext(PresupPantContext);

	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	async function columnsFetch() {
		const col = await presupdetpieColumns();
		setColumns(() => col);
	}

	async function dataFetch() {
		const data = await presupdetpieData();
		setData(data);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
	const [arregloeleg, setArregloeleg] = React.useState([]);

	const [selectionModel, setSelectionModel] = useState([]);

	const handleSelectionModelChange = (selectionModel) => {
		// Generar el array de selección basado en la columna "leyenda"
		console.log("selectionModel  ", selectionModel[selectionModel.length - 1]);
		const foundUser = data.find(
			(datos) => datos.id === selectionModel[selectionModel.length - 1]
		);
		console.log("foundUser  ", foundUser.PresupDetPieLeyenda);
		const selectedLeyendas = selectionModel.map(
			(index) => data[index].PresupDetPieLeyenda
		);
		setSelectionModel(selectedLeyendas);
		console.log("Filas seleccionadas:", selectedLeyendas);
	};
	return (
		<div>
			<DataGrid
				//onSelectionChange={handleOnSelectionChange}
				rows={data}
				columns={columns}
				checkboxSelection
				onRowSelectionModelChange={handleSelectionModelChange}
				selectionModel={selectionModel}
				// onRowSelectionModelChange={(newRowSelectionModel) => {
				// 	setRowSelectionModel(newRowSelectionModel);
				// }}
				// onRowSelectionModelChange={(newRowSelectionModel) => {
				// 	console.log("newRowSelectionModel fff  ", newRowSelectionModel);
				// 	const foundUser = data.find(
				// 		(user) =>
				// 			user.id === newRowSelectionModel[newRowSelectionModel.length - 1]
				// 	);
				// 	console.log("foundUser  ", foundUser);
				// 	setArregloeleg(foundUser.PresupDetPieLeyenda);
				// 	arregloeleg1.push(foundUser.PresupDetPieLeyenda);

				// 	setRowSelectionModel(newRowSelectionModel);
				// 	setState({ ...state, condpagoeleg: data });
				// }}
				// rowSelectionModel={rowSelectionModel}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				// icons={tableIcons}
				// options={{
				// 	sorting: true,
				// 	selection: true,
				// 	addRowPosition: "first",
				// 	showTextRowsSelected: true,
				// 	actionsColumnIndex: -1,
				// 	// tableLayout: "fixed",
				// }}
			/>
		</div>
	);
}
