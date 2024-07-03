import { Label } from "@mui/icons-material";
import {
	Box,
	Grid,
	Input,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import estilos from "../../../Styles/CampoMuestra.module.css";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function CampoMuestra({ arreglodef }) {
	console.log("arreglodef CampoMuestra ", arreglodef);

	// {
	// 	nombre.substring(0, 13) !== "PresupRenglon" && <span>{nombre}:</span>;
	// }
	// PresupRenglon;
	const mostrarElementos = arreglodef.map((elemento, index1) => {
		delete elemento.PresupRenglonNroPresup;
		delete elemento.id;
		delete elemento.idrenglon;
		delete elemento.idPresupRenglon;
		delete elemento.PresupRenglonImpUnit;
		delete elemento.PresupRenglonParamInt;
		console.log("elemento  ", elemento);
		const nombresPropiedades = Object.keys(elemento);
		return (
			<div key={index1}>
				{nombresPropiedades.map(
					(nombrePropiedad, index) =>
						(nombrePropiedad.substring(0, 13) !== "PresupRenglon" && (
							<TextField
								key={index}
								value={elemento[nombrePropiedad]}
								className={estilos.textfield}
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
								label={nombrePropiedad}
								value={elemento[nombrePropiedad]}
								className={estilos.textfield}
							></TextField>
						)
				)}
				{/* {nombresPropiedades.map((nombrePropiedad, index) => (
					<TextField
						key={index}
						label={nombrePropiedad}
						value={elemento[nombrePropiedad]}
						className={estilos.textfield}
					></TextField>
				
				))} */}
			</div>
		);
		// }
	});
	return (
		<div>
			{mostrarElementos}
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
