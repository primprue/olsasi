import { Label } from "@mui/icons-material";
import {
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

export function CampoMuestra({ arreglodef }) {
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
	const mostrarElementos = arreglodef.map((elemento, index1) => {
		delete elemento.PresupRenglonNroPresup;
		delete elemento.id;
		delete elemento.idrenglon;
		delete elemento.idPresupRenglon;
		delete elemento.PresupRenglonImpUnit;
		delete elemento.PresupRenglonParamInt;
		const nombresPropiedades = Object.keys(elemento);
		return (
			<span className={estilos1.contenedordiv} key={index1}>
				<Grid container spacing={2} columns={16}>
					<div key={index1}>
						<span className={estilos1.contenedordiv}>
							{nombresPropiedades.map(
								(nombrePropiedad, index) =>
									(nombrePropiedad.substring(0, 13) !== "PresupRenglon" && (
										<TextField
											key={index}
											value={elemento[nombrePropiedad]}
											variant="outlined"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														{nombrePropiedad}
													</InputAdornment>
												),
											}}
										></TextField>
									)) || (
										<TextField
											key={index}
											multiline
											variant="outlined"
											value={elemento[nombrePropiedad]}
										></TextField>
									)
							)}
						</span>
					</div>
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
