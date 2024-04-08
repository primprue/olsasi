import React from "react";
import { stkGrupoLeerRedRubro } from "../StkGrupos/StkGrupoLeerRedRubro";
import { stkrubroleeproveedor } from "./StkRubroLeeProveedor";
import { stkUnMedLeerRed } from "./StkUnMedLeerRed";
import { stkMonedasleerRed } from "./StkMonedasLeerRed";
import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	const stkgrupo = await stkGrupoLeerRedRubro();
	const stkrubro = await stkrubroleeproveedor();
	const stkUnMed = await stkUnMedLeerRed();
	const stkMonedas = await stkMonedasleerRed();
	const confsn = [
		{ value: "S", label: "S" },
		{ value: "N", label: "N" },
	];
	return columnsFill(stkgrupo, stkrubro, stkUnMed, stkMonedas, confsn);
}

function columnsFill(stkgrupo, stkrubro, stkUnMed, stkMonedas, confsn) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Rubros(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },
			// {
			// 	headerName: "idStkRubro(ID)",
			// 	field: "idStkRubro",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },
			{
				headerName: "Descripción",
				field: "StkRubroDesc",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 145,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Grupo",
				field: "StkRubroCodGrp",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: stkgrupo,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Abreviatura",
				field: "StkRubroAbr",
				order: true,
				width: 80,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Proveedor",
				field: "StkRubroProv",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: stkrubro,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Ancho",
				field: "StkRubroAncho",
				order: true,
				width: 80,
				type: "number",
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Pres. Descripción",
				field: "StkRubroPresDes",
				order: true,
				width: 80,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Presentación",
				field: "StkRubroPres",
				order: true,
				width: 80,
				type: "number",
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Unidad De Medida",
				field: "StkRubroUM",
				type: "singleSelect",
				required: true,
				width: 100,
				valueOptions: stkUnMed,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Costo",
				field: "StkRubroCosto",
				type: "text",
				width: 100,
				placeholder: "999999,99",
				required: true,
				editable: true,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Moneda",
				field: "StkRubroTM",
				type: "singleSelect",
				required: true,
				valueOptions: stkMonedas,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Conf S/N",
				field: "StkRubroConf",
				type: "singleSelect",
				required: true,
				valueOptions: confsn,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Fecha",
				field: "StkRubroFecha",
				order: true,
				width: 100,
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}
