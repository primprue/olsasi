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
				headerName: "Grupo",
				field: "GrupoDesc",
				editable: false,
				//header ClassName: "encabcolumns",
				width: 200,
				align: "left", //alinea el contenido
				headerAlign: "center",
				xs: 8,
			},

			{
				headerName: "Descripción",
				field: "StkRubroDesc",
				type: "text",
				editable: false,
				//header ClassName: "encabcolumns",
				width: 250,
				align: "left", //alinea el contenido
				headerAlign: "center",
			},

			{
				headerName: "Ancho",
				field: "StkRubroAncho",
				type: "numeric",
				//header ClassName: "encabcolumns",
				editable: false,
				width: 100,
				align: "right", //alinea el contenido
				headerAlign: "center",
			},
			{
				headerName: "Presentación",
				field: "StkRubroPres",
				type: "numeric",
				//header ClassName: "encabcolumns",
				editable: false,
				width: 130,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
			},
			{
				headerName: "Público",
				field: "PPub",
				width: 150,
				editable: false,
				type: "text",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				xs: 4,
				// pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				// renderCell: (params) => (
				// 	<div>{params.value && `$ ${params.value}`} </div>
				// ),
			},
			{
				headerName: "Mayorista",
				field: "PMay",
				width: 150,
				editable: false,
				type: "text",
				//header ClassName: "encabcolumns",
				maxLength: 9,
				xs: 4,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				// renderCell: (params) => (
				// 	<div>{params.value && `$ ${params.value}`} </div>
				// ),
			},
			{
				headerName: "Fecha",
				field: "StkRubroFecha",
				//header ClassName: "encabcolumns",
				width: 150,
				align: "right", //alinea el contenido
				headerAlign: "center",
			},
		]);
	});
}
