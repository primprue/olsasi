import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { Button } from "@mui/material";

import { CampoMuestra } from "./CampoMuestra.jsx";

export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	var j = 0;

	const arreglodef = [];

	var i = 0;
	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec) {
			if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
				arreglodef.push(otdatos.datosconfec);
			}
		}
	}
	const OTGraba = () => {
		console.log("otdatos OTGraba  ", otdatos);
		console.log("otdatos datosconfec OTGraba  ", otdatos.datosconfec);
		console.log("otdatos datosencab OTGraba  ", otdatos.datosencab);
		console.log("otdatos renglonespresup OTGraba  ", otdatos.renglonespresup);
	};

	return (
		<>
			{" "}
			<CampoMuestra arreglodef={arreglodef}></CampoMuestra>
			<Button onClick={OTGraba}>Graba</Button>
		</>
	);
}
// const mostrarElementos = arreglodef.map((elemento) => {
// 	const nombresPropiedades = Object.keys(elemento);
// 	return (
// 		<div key={elemento.id}>
// 			{nombresPropiedades.map((nombrePropiedad, index) => (
// 				<CampoDinamico
// 					key={nombrePropiedad}
// 					dato={elemento[nombrePropiedad]}
// 					nombre={nombrePropiedad}
// 					indice={index}
// 				/>
// 			))}
// 		</div>
// 	);
// });

// <div className={estilos.contenedor}>
// 	{/* <TablaDinamica arregloDef={arreglodef}></TablaDinamica> */}
// 	<span className={estilos.contenedordiv}>Cant</span>

// 	<span className={estilos.contenedordiv}>Descripción</span>

// 	<span className={estilos.contenedordiv}>Largo</span>

// 	<span className={estilos.contenedordiv}>Ancho</span>

// 	<span className={estilos.contenedordiv}>Imp.Item</span>
// 	{mostrarElementos}
// </div>
