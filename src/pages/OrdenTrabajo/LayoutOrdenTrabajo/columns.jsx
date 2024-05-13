import React from "react";
import { styled } from "@mui/system";
const MultilineCell = styled("span")`
	white-space: normal;
	line-height: 1.2;
	max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
	overflow: hidden;
`;
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
			{
				field: "PresupRenglonCant",
				headerName: "Cantidad",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
			},
			{
				field: "PresupRenglonDesc",
				headerName: "Descripción",
				width: 400,
				renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
			},
			{
				field: "PresupRenglonLargo",
				headerName: "Largo",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
			},
			{
				field: "PresupRenglonAncho",
				headerName: "Ancho",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
			},
			{
				field: "PresupRenglonImpUnit",
				headerName: "Importe Unitario",
				width: 150,
				placeholder: "99999999,99",
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				editable: "never",
			},
			{
				field: "PresupRenglonImpItem",
				headerName: "Importe Item",
				width: 150,
				placeholder: "99999999,99",
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				editable: "never",
			},

			// {
			// 	field: "PresupRenglonParamInt",
			// 	headerName: "Parámetros Internos",
			// 	width: 800,
			// 	autoHeight: true,
			// 	hide: true,
			// 	renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
			// },
		]);
	});
}
