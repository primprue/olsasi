import React from "react";
import { StkItemsLeeAbrRub } from "../../Tablas/StkItems/StkItemsLeeAbrRub";
import { renderActionsCell } from "@mui/x-data-grid";
export async function llenarcolumns(flattenedData) {
	// console.log("param  ", params);
	// 	var id = params.id;
	// 	flattenedData.map((item) => {
	// 		paramObjeto = JSON.parse(item.PresupRenglonParamInt);
	// 	}),
	// 		(
	// async function buscacolor(tipomat) {
	// 	colores = await StkItemsLeeAbrRub(paramObjeto.StkRubroAbr);
	// 	// );
	// }

	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{ field: "id", headerName: "ID", width: 90 },
			{
				field: "idPresupRenglon",
				headerName: "ID Presup Renglon",
				width: 150,
			},
			{
				field: "PresupRenglonNroPresup",
				headerName: "Nro Presup",
				width: 150,
			},
			{ field: "PresupRenglonCant", headerName: "Cantidad", width: 130 },
			{ field: "PresupRenglonDesc", headerName: "Descripción", width: 400 },
			{ field: "PresupRenglonLargo", headerName: "Largo", width: 120 },
			{ field: "PresupRenglonAncho", headerName: "Ancho", width: 120 },
			{
				field: "PresupRenglonImpUnit",
				headerName: "Importe Unitario",
				width: 180,
			},
			{
				field: "PresupRenglonImpItem",
				headerName: "Importe Item",
				width: 180,
			},

			{
				field: "PresupRenglonParamInt",
				headerName: "Parámetros Internos",
				width: 300,
			},
		]);
	});
}
