import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import estilos from "../../../Styles/CampoDinamico.module.css";
import estilo from "../../../Styles/TextField.module.css";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	Input,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { CampoDinamico } from "./CampoDinamico.jsx";
import { TablaDinamica } from "./TablaDinamica.jsx";
import { CampoMuestra } from "./CampoMuestra.jsx";

export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	var j = 0;
	// for (j = 0; j < otdatos.renglonespresup.length; j++) {
	// 	// let indren = Object.values(datosgenot);
	// 	console.log("otdatos.renglonespresup ff  ", otdatos.renglonespresup[j][0]);
	// }

	const arreglodef = [];

	var i = 0;
	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		// let indren = Object.values(datosgenot);
		// if (
		// 	otdatos.renglonespresup[i][0] !==
		// 		otdatos.renglonespresup[i][0].PresupRenglonNroPresup ||
		// 	otdatos.renglonespresup[i][0] !==
		// 		otdatos.renglonespresup[i][0].PresupRenglonParamInt
		// ) {
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
			arreglodef.push(otdatos.datosconfec);
		}
		// }
	}
	console.log("arreglodef OTGenera ", arreglodef);
	const mostrarElementos = arreglodef.map((elemento) => {
		const nombresPropiedades = Object.keys(elemento);
		return (
			<div key={elemento.id}>
				{nombresPropiedades.map((nombrePropiedad, index) => (
					<CampoDinamico
						key={nombrePropiedad}
						dato={elemento[nombrePropiedad]}
						nombre={nombrePropiedad}
						indice={index}
					/>
				))}
			</div>
		);
	});
	return (
		<>
			{" "}
			<CampoMuestra arreglodef={arreglodef}></CampoMuestra>
		</>
		// <div className={estilos.contenedor}>
		// 	{/* <TablaDinamica arregloDef={arreglodef}></TablaDinamica> */}
		// 	<span className={estilos.contenedordiv}>Cant</span>

		// 	<span className={estilos.contenedordiv}>Descripción</span>

		// 	<span className={estilos.contenedordiv}>Largo</span>

		// 	<span className={estilos.contenedordiv}>Ancho</span>

		// 	<span className={estilos.contenedordiv}>Imp.Item</span>
		// 	{mostrarElementos}
		// </div>
	);
}
