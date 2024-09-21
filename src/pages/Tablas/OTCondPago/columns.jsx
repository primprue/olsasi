import React from "react";
import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "CondPago(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	type: "number",
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Descripción",
				field: "OTCondPagoDesc",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
				alignItems: "left",
			},
		]);
	});
}
