import { useEffect, useState } from "react";

import {
	DataGrid,

} from "@mui/x-data-grid";
import { esES } from '@mui/material/locale';
import { llenarcolumns } from "../../../Tablas/PresupDetPie/columns.jsx";
import formdata from "../../../Tablas/PresupDetPie/formdata.js";
import { DatosLeer } from "../../../../components/DatosLeer.jsx";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function PresupDetPieSelect() {
	const { state, setState } = useContext(PresupPant);

	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	async function columnsFetch() {
		const col = await llenarcolumns();
		setColumns(() => col);
	}

	async function dataFetch() {
		const data = await DatosLeer(formdata.nombackleer);
		// const data = await PresupDetPieLee();
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
				rows={data}
				columns={columns}
				checkboxSelection
				onRowSelectionModelChange={handleSelectionModelChange}
				selectionModel={selectionModel}
				localeText={esES}

			/>
		</div>
	);
}
