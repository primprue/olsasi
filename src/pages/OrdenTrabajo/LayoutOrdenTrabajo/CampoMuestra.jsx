import { Label } from "@mui/icons-material";
import {
	Box,
	Divider,
	Grid,
	Input,
	InputAdornment,
	Stack,
	Tab,
	Tabs,
	TextareaAutosize,
	TextField,
	Typography,
} from "@mui/material";
import estilos from "../../../Styles/CampoMuestra.module.css";
import estilos1 from "../../../Styles/CampoDinamico.module.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField";
export function CampoMuestra({ arreglodef }) {
	let totalot = 0.0;
	const titulosColumnas = {
		PresupRenglonCant: "Cantidad",
		PresupRenglonDesc: "Detalle",
		PresupRenglonLargo: "Largo",
		PresupRenglonAncho: "Ancho",
		PresupRenglonImpItem: "Importe",

		// Agrega todos los nombres de columnas que desees cambiar
	};

	const elementosConPresupRenglon = arreglodef.filter((elemento) =>
		Object.keys(elemento).some((prop) => prop.startsWith("PresupRenglon"))
	);

	const elementosSinPresupRenglon = arreglodef.filter(
		(elemento) =>
			!Object.keys(elemento).some((prop) => prop.startsWith("PresupRenglon"))
	);

	const mostrarElementos = arreglodef
		.filter((elemento, index1) => {
			// Agrega aquí la condición para saltar filas. Por ejemplo, saltar filas con un valor específico en una propiedad.
			// return elemento.nombrePropiedad !== 'valorParaSaltar';
			// Ejemplo: saltar filas donde una propiedad 'skip' sea verdadera
			return Object.keys(elemento).some((prop) =>
				prop.startsWith("PresupRenglon" || prop.startsWith("idrenglon"))
			);
			return !elemento.skip; // Puedes ajustar esta condición según tu necesidad
		})

		.map((elemento, index1) => {
			delete elemento.PresupRenglonNroPresup;
			delete elemento.id;
			delete elemento.idrenglon;
			delete elemento.idPresupRenglon;
			delete elemento.PresupRenglonImpUnit;
			delete elemento.PresupRenglonParamInt;
			const nombresPropiedades = Object.keys(elemento);

			return (
				<TableRow key={index1}>
					{nombresPropiedades.map((propiedad, index2) => (
						<TableCell key={index2}>{elemento[propiedad]}</TableCell>
					))}
				</TableRow>
			);
		});

	const mostrarElementosSinPresupRenglon = elementosSinPresupRenglon.map(
		(elemento, index1) => {
			const nombresPropiedades = Object.keys(elemento);
			return (
				<div
					key={index1}
					style={{
						display: "flex",
						flexWrap: "wrap",
						marginBottom: "20px",
					}}
				>
					{nombresPropiedades.map((propiedad, index2) => (
						<div
							key={index2}
							style={{ marginRight: "20px", marginBottom: "10px" }}
						>
							<strong>{propiedad}:</strong> {elemento[propiedad]}
						</div>
					))}
				</div>
			);
		}
	);

	// Obtener las cabeceras de la tabla
	const cabeceras = Object.keys(arreglodef[0] || {}).filter(
		(propiedad) =>
			![
				"PresupRenglonNroPresup",
				"id",
				"idrenglon",
				"idPresupRenglon",
				"PresupRenglonImpUnit",
				"PresupRenglonParamInt",
			].includes(propiedad)
	);

	return (
		<div>
			<Table>
				<TableHead>
					<TableRow>
						{cabeceras.map((cabecera, index) => (
							<TableCell key={index}>
								{titulosColumnas[cabecera] || cabecera}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{mostrarElementos}</TableBody>
			</Table>

			<div style={{ marginTop: "20px" }}>
				{mostrarElementosSinPresupRenglon}
			</div>
		</div>
	);
	// 	return (
	// 		<div key={index1}>
	// 			<Stack
	// 				direction="row"
	// 				// divider={<Divider orientation="vertical" flexItem />}
	// 				spacing={2}
	// 				className={estilos.columnas}
	// 			>
	// 				{nombresPropiedades.map(
	// 					(nombrePropiedad, index) =>
	// 						(nombrePropiedad.substring(0, 13) !== "PresupRenglon" && (
	// 							<TextField
	// 								key={index}
	// 								value={elemento[nombrePropiedad]}
	// 								variant="standard"
	// 								InputProps={{
	// 									startAdornment: (
	// 										<InputAdornment position="start">
	// 											{nombrePropiedad}
	// 										</InputAdornment>
	// 									),
	// 								}}
	// 								// className={estilos.textfield}
	// 							></TextField>
	// 						)) || (
	// 							<TextField
	// 								key={index}
	// 								multiline
	// 								variant="standard"
	// 								value={elemento[nombrePropiedad]}
	// 								// className={estilos.textfield}
	// 							></TextField>
	// 						)
	// 				)}
	// 			</Stack>
	// 		</div>
	// 	);
	// 	// }
	// });
	// return (
	// 	<div>
	// 		{/* <Grid container spacing={2} alignItems="center"> */}
	// 		{/* <Input item xs={2}>
	// 				Cantidad
	// 			</Input>
	// 			<Input item xs={8}>
	// 				Descripción
	// 			</Input>
	// 			<Input item xs={2}>
	// 				Largo
	// 			</Input>
	// 			<Input item xs={2}>
	// 				Ancho
	// 			</Input>
	// 			<Input item xs={4}>
	// 				Importe Item
	// 			</Input> */}
	// 		{/* <span className={estilos1.contenedordiv}></span> */}
	// 		{mostrarElementos}
	// 		{/* </Grid> */}
	// 		{/* <div className={estilos.contenedordiv}>{dato}</div> // (<div className={estilos.contenedordiv}>{dato}</div>))*/}

	// 		{/* {nombre.substring(0, 13) !== "PresupRenglon" &&
	// 			nombre.substring(0, 2) !== "id" && <TextField label={nombre} />}
	// 		{nombre.substring(0, 13) !== "PresupRenglon" &&
	// 			nombre.substring(0, 2) !== "id" && <TextField value={dato} />} */}
	// 		{/* {nombre.substring(0, 2) !== "id" && (
	// 			<TextField label={nombre} value={dato} />
	// 		)} */}
	// 		{/* </Box> */}
	// 	</div>
	// );
}

/*((
								<TextField
									label="Cantidad"
									value={elemento.PresupRenglonCant}
								></TextField>
							),
							(
								<TextField
									label="Descripción"
									value={elemento.PresupRenglonDesc}
								></TextField>
							),
							(
								<TextField
									label="Largo"
									value={elemento.PresupRenglonLargo}
								></TextField>
							),
							(
								<TextField
									label="Ancho"
									value={elemento.PresupRenglonAncho}
								></TextField>
							),
							(
								<TextField
									label="Importe Item"
									value={elemento.PresupRenglonImpItem}
								></TextField>
							)) */
{
	/* {nombresPropiedades.map((nombrePropiedad, index) => (
					<TextField
						key={index}
						label={nombrePropiedad}
						value={elemento[nombrePropiedad]}
						className={estilos.textfield}
					></TextField>
				
				))} */
}
