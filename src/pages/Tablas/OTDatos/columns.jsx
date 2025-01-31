import React from "react";
import estilotabla from "../../../Styles/Tabla.module.css";
import { PresupConfTipoLeeUnif } from "../PresupConfTipo/PresupConfTipoLeeUnif";
export async function llenarcolumns() {
	const tipoconfec = await PresupConfTipoLeeUnif();
	console.log('tipoconfec', tipoconfec)
	const tipoped = [
		{ value: "select", label: "Selección" },
		{ value: "textfield", label: "Texto" },
	];
	const requerido = [
		{ value: "S", label: "S" },
		{ value: "N", label: "N" },
	];
	return columnsFill(tipoconfec, tipoped, requerido);
}



function columnsFill(tipoconfec, tipoped, requerido) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "OTDatos(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	type: "number",
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Tipo Confección cod",
				field: "OTDatosConfCod",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: tipoconfec,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Tipo Confección",
				field: "OTDatosTipoConf",
				order: true,
				width: 250,
				editable: true,
				required: false,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Descripción",
				field: "OTDatosDesc",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Opciones",
				field: "OTDatosOpciones",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				// es para que se diga si es un texto o se cargan opciones
				headerName: "Tipo Pedido",
				field: "OTDatosTipoPed",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: tipoped,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Requerido",
				field: "OTDatosRequerido",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: requerido,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Orden de Aparición",
				field: "OTDatosOrdenAparicion",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Ancho",
				field: "OTDatosAncho",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}
