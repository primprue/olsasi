import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { OTLeeEncPresup } from "./OTLeeEncPresup.jsx";
import { clientesleercod } from "../../Tablas/Clientes/ClientesLeerCod.jsx";
import estiloinput from "../../../Styles/Inputs.module.css";
import { isNumber } from "@mui/x-data-grid/internals";
import {
	Box,
	Stack,
	Paper,
	TableBody,
	Table,
	TableHead,
	TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablaMuestra from "../../../components/TablaMuestra.jsx";
import { llenarcolumns } from "./columns.jsx";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useFieldArray, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import DataTable from "./OTDataGrid.jsx";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#032a57" : "#eaf3ff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	flexGrow: 3,
}));

export default function OTRecRenglon() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	//const [columns, setColumns] = useState([]);
	const { control, register } = useForm();

	let esnumerico = false;
	let clientepresup = "";
	// const [datosencab, setdatosencab] = useState([]);
	// const [datoscliente, setDatosCliente] = useState([]);
	async function datosencab() {
		const encabezamiento = await OTLeeEncPresup(
			otdatos.renglonespresup[0][0].PresupRenglonNroPresup
		);
		setOTdatos({ ...otdatos, datosencab: encabezamiento });
	}

	async function leedatoscliente(clientepresup, esnumerico) {
		if (esnumerico) {
			const result = await clientesleercod(clientepresup);
			setOTdatos({ ...otdatos, datoscliente: result });
		} else {
			setOTdatos({
				...otdatos,
				datoscliente: clientepresup,
			});
		}
	}
	useEffect(() => {
		if (!otdatos.datosencab) {
			datosencab();
		}

		if (otdatos.datosencab) {
			clientepresup = parseFloat(otdatos.datosencab[0].PresupEncabCliente); // o parseInt(value, 10) si esperas un número entero
			const isNumeric = !isNaN(clientepresup) && isFinite(clientepresup);
			if (isNumeric) {
				esnumerico = true;
			} else {
				clientepresup = otdatos.datosencab[0].PresupEncabCliente;
				esnumerico = false;
			}
			leedatoscliente(clientepresup, esnumerico);
		}
	}, [otdatos.datosencab]); // eslint-disable-line react-hooks/exhaustive-deps

	if (otdatos.datosencab) {
		return (
			<div style={{ width: 2000, padding: 20 }}>
				{/* {console.log("otdatos.renglonespresup;  ", otdatos.renglonespresup)}
				{console.log("otdatos.datosencab;  ", otdatos.datosencab)}
				{console.log("otdatos.datoscliente;  ", otdatos.datoscliente)} */}
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"
				>
					<Item>
						Número de Presupuesto: {otdatos.datosencab[0].idPresupEncab}
					</Item>
					<Item>Fecha: {otdatos.datosencab[0].PresupEncabFecha}</Item>
					<Item>MayMin: {otdatos.datosencab[0].PresupEncabMayMin}</Item>
					<Item>Total: {otdatos.datosencab[0].PresupEncabTotal}</Item>
					<Item>Explicacion: {otdatos.datosencab[0].PresupEncabExplic}</Item>
				</Stack>
				{(otdatos.datoscliente && (
					<Stack
						spacing={{ xs: 1, sm: 2 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
					>
						<Item>Número de Cliente: {otdatos.datoscliente[0].idClientes}</Item>
						<Item>Cliente: {otdatos.datoscliente[0].ClientesDesc}</Item>
						<Item>Domicilio: {otdatos.datoscliente[0].ClientesDomicilio}</Item>
						<Item>CodPos: {otdatos.datoscliente[0].ClientesCodPos}</Item>
						<Item>Localidad: {otdatos.datoscliente[0].ClientesLoc}</Item>
						<Item>Pcia: {otdatos.datoscliente[0].ClientesPcia}</Item>
						<Item>Tel: {otdatos.datoscliente[0].ClientesTel}</Item>
						<Item>Mail: {otdatos.datoscliente[0].ClientesMail}</Item>
						<Item>CUIT: {otdatos.datoscliente[0].ClientesCUIT}</Item>
					</Stack>
				)) || <p></p>}
				{/* <TableContainer component={Paper}> */}

				<DataTable data={otdatos.renglonespresup} />
				<Table>
					<TableBody>
						<TableRow>
							{otdatos.renglonespresup.map((nivel1, index1) => (
								<div key={index1}>
									{/* {nivel1.map((nivel2) => (
										<div key={nivel2.id}>
											<p>{nivel2.id}</p>
											<p>{nivel2.PresupRenglonCant}</p>
											<p>{nivel2.PresupRenglonDesc}</p>
											<p>{nivel2.PresupRenglonImpUnit}</p>
											<p>{nivel2.PresupRenglonImpItem}</p> */}
									{nivel1.map((item) => {
										const paramObjeto = JSON.parse(item.PresupRenglonParamInt);
										return Object.entries(paramObjeto).map(([campo, valor]) => (
											<li key={campo}>
												<strong>{campo}:</strong> {valor}
											</li>
										));
									})}
								</div>
							))}
						</TableRow>
					</TableBody>
				</Table>
				{/* </TableContainer> */}
				{/* {fields.map((field, index) => (
					<input
						key={field.id} // important to include key with field's id
						{...register(`test.${index}.value`)}
					/>
				))} */}
			</div>
			// <Box
			// 	sx={{
			// 		width: "100%",
			// 		height: "500px",
			// 		align: "center",
			// 		justifycontent: "center",
			// 		boxShadow: 5,
			// 	}}
			// >
			// 	<DataGrid
			// 		autoHeight
			// 		sx={{
			// 			width: "100%",
			// 			"& .encabcolumns": {
			// 				backgroundColor: "rgba(235, 240, 241, 0.3)",
			// 				textJustify: "center",
			// 				fontSize: "15px",
			// 				fontWeight: "bold",
			// 				color: "rgba(15, 6, 145)",
			// 				borderRadius: 1,
			// 				boxShadow: 3,
			// 				bgcolor: "rgba(235, 240, 241, 0.3)",
			// 				height: 10,
			// 			},
			// 		}}
			// 		rows={otdatos.renglonespresup}
			// 		columns={columns}
			// 		title="Renglon Orden de Trabajo"
			// 		// localeText={esES.components.MuiDataGrid.defaultProps.localeText}
			// 		// slots={{
			// 		// 	toolbar: CustomToolbar,
			// 		// }}
			// 		// getCellClassName={() => `super-app-theme--Open`}
			// 		// getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
			// 	/>
			// </Box>
		);
	} else {
		return "";
	}
}
