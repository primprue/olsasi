import React from "react";

import { OTCondPagoLeer } from "./OTCondPagoLeer";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import TablasContexto from "../../../context/TablasContext.jsx";
import { formdata } from "./formdata.js";

import TablaMuestra from "../../../components/TablaMuestra.jsx";
export default function Transporte() {
	const { formdatos, setFormdatos } = use(TablasContexto);
	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await OTCondPagoLeer();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<TablaMuestra
				rows1={rows}
				columns1={columns}
				formdatos={formdatos}
			></TablaMuestra>
		</>
	);
}
