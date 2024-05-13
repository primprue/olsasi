import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { llenarcolumns } from "./columns";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral";
import OTPiletaEnrollable from "../OTFilas/OTPiletaEnrollable/OTPiletaEnrollable";
import { Button, Grid } from "@mui/material";

export default function OTDataGrid({ data }) {
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
		console.log("patamObjeto en OTDataGrid  ", paramObjeto);
		setPresuptipo(paramObjeto.tipopresup);
		setDatospot("");
		setDatospot(paramObjeto);
		// setOpen(true);
	}

	// const handleClose = () => {
	// 	setOpen(false);
	// 	// initialFetch();
	// };

	return (
		<Grid style={{ height: 400, width: "100%" }}>
			{datospot !== undefined && <OTFilaGral datospot={datospot}></OTFilaGral>}
			{presuptipo === "PILETA ENROLLABLE" && (
				<OTPiletaEnrollable datospot={datospot}></OTPiletaEnrollable>
			)}

			<DataGrid
				columnHeaderHeight={35}
				key={gridKey}
				rows={rows}
				columns={columns}
				onCellClick={handleCellClick}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</Grid>
	);
}
