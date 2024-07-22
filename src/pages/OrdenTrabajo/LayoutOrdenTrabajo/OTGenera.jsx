import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";

import { CampoMuestra } from "./CampoMuestra.jsx";
import { CampoEncab } from "./CamposEncab.jsx";
import { OTGrabar } from "./OTGrabar.jsx";

export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	const { inicializaOT } = useContext(OrdTrabajo);
	var j = 0;
	let colorfondo = "";
	const arreglodef = [];
	const arregloencab = [];
	var i = 0;
	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec) {
			if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
				arreglodef.push(otdatos.datosconfec);
			}
		}
	}
	var j = 0;
	if (otdatos.datosencab.length > 1) {
		arregloencab.push(otdatos.datosencab[1][0]);
	} else {
		arregloencab.push(otdatos.datosencab[0][0]);
	}

	if (datospot.minmay === "my") {
		colorfondo = "#a6d4ff8d";
	} else {
		if (datospot.minmay === "mn" && datospot.tipopresup !== "CONFECCIONADA") {
			colorfondo = "#ffffa6ca";
		} else if (
			datospot.minmay === "mn" &&
			datospot.tipopresup === "CONFECCIONADA"
		) {
			colorfondo = "#f1f1ef4c";
		}
	}

	const OTGraba = () => {
		console.log("otdatos OTGraba  ", otdatos);
		console.log("otdatos datosconfec OTGraba  ", otdatos.datosconfec); //datos de lo que pide por json otros datos
		console.log("otdatos datosencab OTGraba  ", otdatos.datosencab);
		// console.log("otdatos datosencab OTGraba  ", otdatos.datosencab[0]);
		// console.log("otdatos datosencab OTGraba  ", otdatos.datosencab[1]);
		console.log("otdatos renglonespresup OTGraba  ", otdatos.renglonespresup);
		// if (otdatos.datosencab.length > 1) {
		// 	console.log("otdatos.datosencab[1]  ", otdatos.datosencab[1]);
		OTGrabar(otdatos.datosconfec, otdatos.renglonespresup, otdatos.datosencab);
		// } else {
		// 	console.log("otdatos.datosencab[0][0]  ", otdatos.datosencab[0][0]);
		// 	OTGrabar(
		// 		otdatos.datosconfec,
		// 		otdatos.renglonespresup,
		// 		otdatos.datosencab[0][0]
		// 	);
		// }
		//inicializaOT();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth={false}
			fullWidth={true}
			sx={{
				backgroundColor: colorfondo,
			}}
		>
			<DialogContent>
				<Typography variant="h4" align="center" gutterBottom>
					Orden de Trabajo
				</Typography>

				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "calc(30% - 16px)" },
					}}
					noValidate
					autoComplete="off"
				>
					<CampoEncab
						arregloencab={arregloencab}
						nropresup={otdatos.datosencab[0][0].idPresupEncab}
					></CampoEncab>
					<CampoMuestra arreglodef={arreglodef}></CampoMuestra>
					<Button onClick={OTGraba}>Graba</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}
