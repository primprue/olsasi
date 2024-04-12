import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
export default function FilaUno() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);

	console.log(
		"otdatos en otdatosOTO  renglonespresup: ",
		otdatos.renglonespresup
	);
	console.log(
		"otdatos en otdatosOTO  renglonespresup[0][0]: ",
		otdatos.renglonespresup[0][0].idPresupRenglon
	);

	let data = "";

	// async function initialFetch() {
	// 	//	columnsFetch();
	// 	dataOTO();
	// }

	// useEffect(() => {
	// 	initialFetch();
	// 	// setValor("Lista de Precios");
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	console.log("estoy en fialuno de orden de ptrabajo  ");
	return (
		<div>
			<label>hola don pepito</label>
		</div>
	);
}
