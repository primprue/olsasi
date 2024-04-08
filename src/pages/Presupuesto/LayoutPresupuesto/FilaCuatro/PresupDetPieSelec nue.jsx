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
import { llenarcolumns } from "../../../Tablas/PresupDetPie/columns";
import { PresupDetPieLee } from "../../../Tablas/PresupDetPie/PresupDetPieLee";
// import { presupdetpieColumns } from "../../PresupDetPie/presupdetpieColumns";
// import { presupdetpieData } from "../../PresupDetPie/presupdetpieData";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

var arregloeleg1 = [];
export default function PresupDetPieSelect() {
	const { state, setState } = useContext(PresupPantContext);

	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	async function columnsFetch() {
		const col = await llenarcolumns();
		setColumns(() => col);
	}

	async function dataFetch() {
		const data = await PresupDetPieLee();
		setData(data);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [selectionModel, setSelectionModel] = useState([]);

	const handleSelectionModelChange = (selectionModel) => {
		const selectedLeyendas = selectionModel.map((row, i) =>
			data.filter((rows) => rows.id == row)
		);

		setSelectionModel(selectedLeyendas);
		setState({ ...state, condpagoeleg: selectedLeyendas });
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
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				pageSizeOptions={[10, 10]}
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
