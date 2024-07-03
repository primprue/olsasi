import { Label } from "@mui/icons-material";
import { Box, Grid, Input, TextField } from "@mui/material";
import estilos from "../../../Styles/CampoDinamico.module.css";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export function CampoDinamico({ key, dato, nombre, indice }) {
	console.log("nombre  ", nombre);
	console.log("dato  ", dato);
	console.log("indice  ", indice);
	// {
	// 	nombre.substring(0, 13) !== "PresupRenglon" && <span>{nombre}:</span>;
	// }
	// PresupRenglon;

	return (
		<div>
			{/* <div className={estilos.contenedordiv}>{dato}</div> // (<div className={estilos.contenedordiv}>{dato}</div>))*/}
			<span className={estilos.contenedordiv}>
				{nombre === "PresupRenglonCant" && (
					<span className={estilos.contenedordiv}> {dato}</span>
				)}
				{nombre === "PresupRenglonDesc" && (
					<span className={estilos.contenedordiv}> {dato}</span>
				)}
				{nombre === "PresupRenglonLargo" && (
					<span className={estilos.contenedordiv}> {dato}</span>
				)}
				{nombre === "PresupRenglonAncho" && (
					<span className={estilos.contenedordiv}> {dato}</span>
				)}
				{nombre === "PresupRenglonImpItem" && (
					<span className={estilos.contenedordiv}> {dato}</span>
				)}
			</span>
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
