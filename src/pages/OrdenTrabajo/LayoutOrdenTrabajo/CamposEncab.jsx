import { Label } from "@mui/icons-material";
import {
	Alert,
	Box,
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
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function CampoEncab({ arregloencab, nropresup }) {
	function calculateMinWidth(value) {
		const valueLength = value.length;
		const minWidth = Math.max(valueLength * 3); // Adjust 10 based on your desired minimum width per character
		return minWidth;
	}

	function calculateMaxWidth(value) {
		//const maxWidth = 200; // Adjust this value to your desired maximum width
		const valueLength = value.length;
		const maxWidth = Math.max(valueLength * 10, 100);
		return maxWidth;
	}
	console.log("arregloencb  ", arregloencab);
	const mostrarElementos = arregloencab.map((elemento, index1) => {
		delete elemento.ClientesTipo;
		delete elemento.ClientesContacto;
		delete elemento.ClientesCategoria;
		delete elemento.ClientesObserv1;
		delete elemento.ClientesObserv2;
		delete elemento.ClientesFecha;

		const nombresPropiedades = Object.keys(elemento);
		return (
			<span className={estilos1.contenedordiv} key={index1}>
				<Grid container>
					<Grid item>
						<div key={index1}>
							{nombresPropiedades.map((nombrePropiedad, index) => (
								<TextField
									key={index}
									value={elemento[nombrePropiedad]}
									variant="standard"
									multiline
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{nombrePropiedad.replace("Clientes", "")}
											</InputAdornment>
										),
									}}
								></TextField>
							))}
						</div>
					</Grid>
				</Grid>
			</span>
		);
		// }
	});
	return (
		<div>
			{/* <Grid container spacing={2} alignItems="center"> */}
			{/* <Input item xs={2}>
					Cantidad
				</Input>
				<Input item xs={8}>
					Descripción
				</Input>
				<Input item xs={2}>
					Largo
				</Input>
				<Input item xs={2}>
					Ancho
				</Input>
				<Input item xs={4}>
					Importe Item
				</Input> */}
			{/* <span className={estilos1.contenedordiv}></span> */}
			<a>Nro Presupuesto {nropresup}</a>
			<a>Datos Cliente</a>
			{mostrarElementos}
			{/* </Grid> */}
			{/* <div className={estilos.contenedordiv}>{dato}</div> // (<div className={estilos.contenedordiv}>{dato}</div>))*/}

			{/* {nombre.substring(0, 13) !== "PresupRenglon" &&
				nombre.substring(0, 2) !== "id" && <TextField label={nombre} />}
			{nombre.substring(0, 13) !== "PresupRenglon" &&
				nombre.substring(0, 2) !== "id" && <TextField value={dato} />} */}
			{/* {nombre.substring(0, 2) !== "id" && (
				<TextField label={nombre} value={dato} />
			)} */}
			{/* </Box> */}
		</div>
	);
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
