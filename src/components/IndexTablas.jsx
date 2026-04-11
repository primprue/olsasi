

import { useState, useEffect } from 'react';
import { DatosLeer } from "./DatosLeer.jsx";
import { use } from "react";
import TablasContexto from "../context/TablasContext.jsx";

import TablaMuestra from './TablaMuestra.jsx';
import { Box } from '@mui/material';
const IndexTablas = ({ rutaRelativa }) => {
	const [recursos, setRecursos] = useState({ data: null, columns: null });
	const [cargando, setCargando] = useState(true);
	const { formdatos, setFormdatos } = use(TablasContexto);
	const [rows, setRows] = useState([]);
	async function dataFetch() {
		if (recursos.data) {
			const data = await DatosLeer(recursos.data.nombackleer);
			setRows(data);
		}
	}
	useEffect(() => {
		const cargarTodo = async () => {
			setCargando(true);
			try {
				// Importación en paralelo de ambos archivos
				const [modData, modCols] = await Promise.all([
					import(`../pages/Tablas/${rutaRelativa}/formdata.js`),
					import(`../pages/Tablas/${rutaRelativa}/columns.jsx`)
				]);

				// modData.default -> porque usaste export default
				// modCols.llenarcolumns -> porque usaste export async function
				const dataConfig = modData.default;
				const columnsData = await modCols.llenarcolumns(); // La ejecutamos porque es async

				setRecursos({
					data: dataConfig,
					columns: columnsData
				});
			} catch (error) {
				console.error("Error al cargar los archivos dinámicos:", error);
			} finally {
				setCargando(false);
			}
		};

		if (rutaRelativa) {
			cargarTodo();
		}
	}, [rutaRelativa]);

	useEffect(() => {
		dataFetch();
		setFormdatos(recursos.data);
	}, [recursos]);
	if (cargando) return <div>Cargando configuración de {rutaRelativa}...</div>;

	return (
		// <div style={{ margin: 6, height: "80vh", width: "100%" }}>
		<div style={{ flexGrow: 1, height: "700px", width: "100%", overflow: 'hidden' }}>
			<TablaMuestra
				rows1={rows}
				columns1={recursos.columns}
				formdatos={recursos.data}
			></TablaMuestra>
		</div>
	);
};
export default IndexTablas;







// import { lazy } from 'react';
// import { DatosLeer } from "./DatosLeer.jsx";
// const formdata = lazy(() => import(`../pages/Tablas/${tipo}/formdata.js`));
// const { llenarcolumns } = lazy(() => import(`../pages/Tablas/${tipo}/columns.jsx`));

// import { useEffect } from "react";
// import { useState } from "react";

// import { use } from "react";
// import TablasContexto from "../context/TablasContext.jsx";

// import TablaMuestra from './TablaMuestra.jsx';

// const IndexTablas = ({ tipo }) => {
// 	console.log('tipo IndexTablas ', tipo)
// 	console.log('fromdata IndexTablas ', formdata)
// 	// export default function () {
// 	const { formdatos, setFormdatos } = use(TablasContexto);
// 	const [rows, setRows] = useState([]);
// 	const [columns, setColumns] = useState([]);
// 	//empiezan las cosas del sistema
// 	async function columnsFetch() {
// 		var col = await llenarcolumns();
// 		setColumns(() => col);
// 	}
// 	async function dataFetch() {
// 		const data = await DatosLeer(formdata.nombackleer);
// 		setRows(data);
// 	}
// 	async function initialFetch() {
// 		columnsFetch();
// 		dataFetch();
// 	}
// 	useEffect(() => {
// 		initialFetch();
// 		setFormdatos(formdata);
// 	}, []); // eslint-disable-line react-hooks/exhaustive-deps
// 	return (
// 		<>
// 			<TablaMuestra
// 				rows1={rows}
// 				columns1={columns}
// 				formdatos={formdatos}
// 			></TablaMuestra>
// 		</>
// 	);
// }
// export default IndexTablas;



// import { llenarcolumns } from "./columns.jsx";
//import llenarcolumns from `../pages/Tablas/${nombre}/columns.jsx`

// import formdata from `../pages/Tablas/${nombre}/formdata.js`;

// import { formdata } from "./formdata.js";