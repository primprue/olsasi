import React from "react";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { useContext } from "react";
import StaticContexto from "../../../context/StaticContext.jsx";
import TablasContexto from "../../../context/TablasContext.jsx";
import { formdata } from "./formdata.js";

import TablaMuestra from "../../../components/TablaMuestra.jsx";
export default function Rubros() {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { valor, setValor } = useContext(StaticContexto);
	const [rows, setRows] = React.useState([]);
	const [columns, setColumns] = useState([]);
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await stkrubroleermezcla();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Rubros");
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
