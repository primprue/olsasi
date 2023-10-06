import React, { Component } from "react";
import Button from "@mui/material/Button";
import { leerStkMonedas } from "../../Monedas/StkMonedasLeer";
import { leetipoprov } from "./LeeTipoProv";

import { ButtonGroup, TextField } from "@mui/material";
//sacado de https://mui.com/x/react-data-grid/editing/ With auto-stop
//https://github.com/mui/mui-x/issues/4437

//https://codesandbox.io/s/columntypesgrid-material-demo-forked-hmb3e9?file=/demo.js
//https://mui.com/x/react-data-grid/column-definition/#column-types

export async function llenarcolumns() {
	const tipoprov = await leetipoprov();

	const stkMonedas = await leerStkMonedas();

	return columnsFill(tipoprov, stkMonedas);
}

function columnsFill(tipoprov, stkMonedas) {
	return new Promise(function (resolve) {
		resolve([
			{ headerName: "id", field: "id", type: "text" },
			{
				headerName: "Descripción",
				field: "ProveedoresDesc",
				placeholder: "//////////",
				editable: true,
				required: true,
				pattern: /^/,
				width: 250,
			},

			{
				headerName: "Tipo",
				field: "ProveedoresTipo",
				type: "singleSelect",
				valueOptions: tipoprov,
				required: true,
				editable: true,
				width: 200,
			},
			{
				headerName: "CUIT",
				field: "ProveedoresCUIT",
				editable: true,
				width: 120,
				color: "secondary",
				type: "text",
				pattern: /^[0-9]{0,2}-[0-9]{0,8}-[0-9]{1,1}$/,
				placeholder: "99-99999999-9",
			},
			{
				headerName: "Calle",
				field: "ProveedoresCalle",
				editable: true,
				width: 350,
				type: "text",
			},
			{
				headerName: "Calle Nro.",
				field: "ProveedoresNroCalle",
				editable: true,
				type: "number",
				defaultValue: 0,
			},

			{
				headerName: "Piso",
				field: "ProveedoresPiso",
				editable: true,
				type: "text",
			},
			{
				headerName: "Dto",
				field: "ProveedoresDto",
				editable: true,
				type: "text",
			},
			{
				headerName: "CodPos",
				field: "ProveedoresCodPos",
				type: "text",
				editable: true,
			},
			{
				headerName: "Loc",
				field: "ProveedoresLoc",
				type: "text",
				editable: true,
				width: 120,
			},
			{
				headerName: "Pcia",
				field: "ProveedoresPcia",
				type: "text",
				editable: true,
				width: 120,
			},
			{
				headerName: "Tel",
				field: "ProveedoresTel",
				type: "text",
				editable: true,
			},
			{
				headerName: "Contacto",
				field: "ProveedoresContacto",
				type: "text",
				editable: true,
			},
			{
				headerName: "Mail",
				field: "ProveedoresMail",
				type: "text",
				type: "email",
				editable: true,
			},
			{
				headerName: "Web",
				field: "ProveedoresWeb",
				type: "text",
				editable: true,
			},
			{
				field: "ProveedoresCodMon",
				headerName: "CodMon",
				type: "singleSelect",
				required: true,
				valueOptions: stkMonedas,
				editable: true,
			},
		]);
	});
}

// inputProps: {
// 	"data-testid": `validated-textfield-ProveedoresDesc`,
// },
