

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


