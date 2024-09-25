import { red } from "@mui/material/colors";
import React from "react";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// headerName: "id",
			// field: "id",
			// type: "text",
			// width: 3,
			// editable: false,
			// },
			{
				headerName: "Cantidad",
				field: "Cantidad",
				editable: false,
				//header ClassName: "encabcolumns",
				width: 100,
				type: "numeric",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				xs: 4,
				// pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				// renderCell: (params) => (
				// 	<div>{params.value && ` ${params.value}`} </div>
				// ),
			},

			{
				headerName: "Abr.Rubro",
				field: "StkItemsRubroAbr",
				type: "text",
				editable: false,
				//header ClassName: "encabcolumns",
				width: 100,
				align: "left", //alinea el contenido
				headerAlign: "center",
			},

			{
				headerName: "Rubro",
				field: "StkRubroDesc",
				type: "text",
				//header ClassName: "encabcolumns",
				editable: false,
				width: 250,
				align: "left", //alinea el contenido
				headerAlign: "center",
			},

			{
				headerName: "Costo",
				field: "StkRubroCosto",
				width: 150,
				editable: false,
				type: "text",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				renderCell: (params) => (
					<div>{params.value && `$ ${params.value}`} </div>
				),
			},

			{
				headerName: "StkRubroTM",
				field: "Moneda",
				width: 150,
				editable: false,
				type: "text",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				xs: 4,
			},
			{
				headerName: "Costo Total",
				field: "TotalItem",
				width: 150,
				editable: false,
				type: "text",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				renderCell: (params) => (
					<div>{params.value && `$ ${params.value}`} </div>
				),
			},
		]);
	});
}
