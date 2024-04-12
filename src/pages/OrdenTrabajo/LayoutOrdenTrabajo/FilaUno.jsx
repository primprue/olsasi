import { useEffect } from "react";
import React from "react";
import { OTOrigenLee } from "./OTOrigenLee";
import { OTOrigenCambiaEstado } from "./OTOrigenCambiaEstado";
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

	// const relegidos = otdatos.renglonespresup.flatMap((arr) =>
	// 	arr.map((obj) => ({
	// 		idPresupRenglon: obj.idPresupRenglon,
	// 		PresupRenglonNroPresup: obj.PresupRenglonNroPresup,
	// 	}))
	// );
	// console.log("idPresupRenglon  ", idPresupRenglon);
	// console.log("PresupRenglonNroPresup  ", PresupRenglonNroPresup);
	let data = "";
	// async function dataOTO() {
	// 	data = await OTOrigenLee();
	// 	dataOTE(data);
	// 	console.log("data en dataOTO  ", data);
	// 	// setRows(data);
	// }
	// async function dataOTE() {
	// 	//const data1 = await OTOrigenCambiaEstado(data[0].OTOrigenNroPresup);
	// 	console.log("data en otorigenlee  ", data);
	// 	console.log("data en otorigenlee  ", data[0].OTOrigenNroPresup);

	// 	// setRows(data);
	// }
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
