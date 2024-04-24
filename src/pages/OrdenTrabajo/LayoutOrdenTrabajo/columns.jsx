import React from "react";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// { field: "id", headerName: "ID", width: 90 },
			{ field: "idPresupRenglon", headerName: "ID Presup Renglon", width: 150 },
			{ field: "PresupRenglonNroPresup", headerName: "Nro Presup", width: 150 },
			{ field: "PresupRenglonCant", headerName: "Cantidad", width: 130 },
			{ field: "PresupRenglonDesc", headerName: "Descripción", width: 400 },
			{ field: "PresupRenglonLargo", headerName: "Largo", width: 120 },
			{ field: "PresupRenglonAncho", headerName: "Ancho", width: 120 },
			{
				field: "PresupRenglonImpUnit",
				headerName: "Importe Unitario",
				width: 180,
			},
			{ field: "PresupRenglonImpItem", headerName: "Importe Item", width: 180 },

			{
				field: "PresupRenglonParamInt",
				headerName: "Parámetros Internos",
				width: 300,
			},
		]);
	});
}
