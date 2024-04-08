import React from "react";
import { styled } from "@mui/system";
const MultilineCell = styled("div")`
	white-space: normal;
	line-height: 1.2;
	max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
	overflow: hidden;
`;
let prim = "es-AR";
let seg = "ARS";
const formatter = new Intl.NumberFormat(prim, {
	style: "currency",
	currency: seg,
	minimumFractionDigits: 2,
});

export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Cant.",
				field: "PresupCantidad",
				width: 10,
				headerAlign: "center",
			},
			{
				headerName: "Descripción",
				field: "StkRubroDesc",
				renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				width: 700,
				headerAlign: "center",
				showCellVerticalBorder: true,
			},
			{
				headerName: "Largo",
				field: "PresupLargo",
				width: 150,
				headerAlign: "center",
			},
			{
				headerName: "Ancho",
				field: "PresupAncho",
				width: 150,
				headerAlign: "center",
			},
			{
				headerName: "Imp. Unit.",
				field: "ImpUnitariof",
				type: "number",
				// pattern: /^[0-9]{0,10}.[0-9]{0,2}$/,
				// renderCell: (params) => (
				// 	<div style={{ textAlign: "right" }}>
				// 		{params.value &&
				// 			formatter
				// 				.format(Number(params.value).toFixed(2))
				// 				.replace("$", signomon)}{" "}
				// 		{/* Agrega el signo monetario */}
				// 	</div>
				// ),
				// renderCell: (params) => (
				// 	<div style={{ textAlign: "right" }}>
				// 		{params.value &&
				// 			formatter
				// 				.format(Number(params.value).toFixed(2))
				// 				.replace("$", "&")}{" "}
				// 		{/* Agrega el signo monetario */}
				// 	</div>
				// ),
				alignItems: "right",
				width: 220,
				headerAlign: "center",
			},
			{
				headerName: "Imp. Item.",
				field: "ImpItemf",
				type: "number",
				// format: (field) => field.valor.toLocaleString('USD'),
				pattern: /^[0-9]{0,10}.[0-9]{0,2}$/,
				alignItems: "right",
				width: 220,
				headerAlign: "center",
			},
			{
				headerName: "datospresup",
				field: "datoscalculos",
				hideable: false,
			},
		]);
	});
}
